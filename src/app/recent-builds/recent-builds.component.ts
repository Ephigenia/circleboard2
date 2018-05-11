import { Component, OnInit, OnDestroy } from '@angular/core';

import {
  combineLatest,
  fromEvent,
  Observable,
  Subject,
  timer
} from 'rxjs';
import {
  delay,
  skipWhile,
  flatMap,
  map,
  merge,
  retryWhen,
  takeUntil,
} from 'rxjs/operators';

import { CircleCiService } from './../circle-ci.service';
import { BoardConfigService } from './../board-config.service';

@Component({
  selector: 'app-recent-builds',
  templateUrl: './recent-builds.component.html',
})
export class RecentBuildsComponent implements OnInit, OnDestroy {

  // list of currently displayed builds
  public builds: Array<any> = [];
  public builds$: Observable<Array<any>>;
  // last Error object that happened while loading the builds
  public error: Error;
  public showConfigMessage = false;
  // subscription for browser on/offline events
  public online$: Observable<boolean>;

  public ngUnsubscribe: Subject<boolean> = new Subject<boolean>();

  constructor(
    private circleci: CircleCiService,
    private configService: BoardConfigService,
  ) {
    // start the stream with the current online status
    this.online$ = Observable.create(sub => {
      sub.next(navigator.onLine);
      sub.complete();
    })
    // listen to offline / online events triggered on window object and
    // convert the result to simple boolean
    .pipe(merge(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true))
    ));
  }

  public ngOnInit() {
    const config = this.configService.read();

    this.showConfigMessage = !config.apiToken;

    if (config.apiToken) {
      // create timer which emits a number every config interval setting seconds
      const timer$ = timer(0, config.refreshInterval * 1000);

      // listen to online/offline and timer emits
      this.builds$ = combineLatest([this.online$, timer$]).pipe(
        // stop when component was destroyed
        takeUntil(this.ngUnsubscribe),
        // only continue when browser is online, otherwise stop here
        // also restart syncing everytime browser goes online again
        skipWhile(val => !val[0]),
        flatMap(() => {
          delete this.error;
          return this.circleci.getRecentBuilds(config.apiToken, 100);
        }),
        map((builds: any[]) => {
          if (config.groupWorkflows) {
            builds = this.circleci.groupByWorkflows(builds);
          }
          return builds;
        }),
        retryWhen(errors => errors.pipe(
          map(error => {
            this.error = error;
            return error;
          }),
          delay(config.refreshInterval * 1000)
        ))
      );
      this.builds$.subscribe((builds: any[]) => this.builds = builds);
    }
  }

  public ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }
}
