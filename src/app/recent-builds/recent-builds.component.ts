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

  public errorMessage: string;

  public showConfigMessage: boolean = false;

  // helper subscription which is completed when the component gets destroyed
  private ngUnsubscribe: Subject<boolean> = new Subject<boolean>();

  constructor(
    private circleci: CircleCiService,
    private configService: BoardConfigService,
  ) { }

  public ngOnInit() {
    const config = this.configService.read();

    this.showConfigMessage = !config.apiKey;

    if (config.apiKey) {
      Observable.timer(0, config.refreshInterval * 1000)
        .takeUntil(this.ngUnsubscribe)
        .flatMap(() => this.circleci.getRecentBuilds(config.apiKey, 100))
        .subscribe(
          (builds) => {
            this.builds = this.circleci.groupByWorkflows(builds);
            window['builds'] = this.builds;
          }, (err) => {
            this.errorMessage = err.message;
          });
    }
  }

  public ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }
}
