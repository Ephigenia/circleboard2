import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/mergeMap';
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

  // helper subscription which is completed when the component gets destroyed
  private ngUnsubscribe: Subject<boolean> = new Subject<boolean>();

  constructor(
    private circleci: CircleCiService,
    private configService: BoardConfigService,
  ) { }

  public ngOnInit() {
    const config = this.configService.read();

    this.showConfigMessage = !config.apiToken;

    if (config.apiToken) {
      Observable.timer(0, config.refreshInterval * 1000)
        .takeUntil(this.ngUnsubscribe)
        .flatMap(() => this.circleci.getRecentBuilds(config.apiToken, 100))
        .subscribe(
          (builds) => {
            // remove previous error
            delete this.error;
            if (config.groupWorkflows) {
              builds = this.circleci.groupByWorkflows(builds);
            }
            this.builds = builds;
          },
          (err) => {
            this.error = err
            console.error(this.error);
          }
        );
    }
  }

  public ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }
}
