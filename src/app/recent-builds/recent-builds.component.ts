import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromEvent';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { CircleCiService } from './../circle-ci.service';
import { BoardConfigService } from '../board-config.service';

@Component({
  selector: 'app-recent-builds',
  templateUrl: './recent-builds.component.html',
})
export class RecentBuildsComponent implements OnInit, OnDestroy {

  public builds: Array<any> = [];
  public error: Error;
  public showConfigMessage = false;
  public online$: Observable<boolean>;

  // helper subscription which is completed when the component gets destroyed
  private ngUnsubscribe: Subject<boolean> = new Subject<boolean>();

  constructor(
    private circleci: CircleCiService,
    private configService: BoardConfigService,
  ) {
    this.online$ = Observable.merge(
      // use .map() to transform the returned Event type into a true/false value
      Observable.fromEvent(window, 'offline').map(() => false),
      Observable.fromEvent(window, 'online').map(() => true),
      // start the stream with the current online status
      Observable.create(sub => {
        sub.next(navigator.onLine);
        sub.complete();
      })
    );
  }

  public ngOnInit() {
    const config = this.configService.read();

    this.showConfigMessage = !config.apiToken;

    if (config.apiToken) {
      const timer$ = Observable.timer(0, config.refreshInterval * 1000);
      Observable.combineLatest([this.online$, timer$])
        .takeUntil(this.ngUnsubscribe)
        .filter(([online]) => online)
        .flatMap(() => {
          delete this.error;
          return this.circleci.getRecentBuilds(config.apiToken, 100);
        })
        .map((builds: any[]) => {
          if (config.groupWorkflows) {
            return this.circleci.groupByWorkflows(builds);
          }
          return builds;
        })
        .subscribe(
          (builds: any[]) => this.builds = builds,
          (err: Error) => {
            this.error = err;
            console.log(err);
          },
          () => console.log('completd')
        );
    }
  }

  public ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }
}
