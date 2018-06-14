import { Component, Input, HostBinding } from '@angular/core';
import { SimpleChanges, OnChanges } from '@angular/core';
import { DatePipe } from '@angular/common';

import { BUILD_LIFECYCLE, BUILD_OUTCOME } from '../circle-ci.service';

@Component({
  // unknown how to fix this when the selector must be used on a tr-tag
  /* tslint:disable:component-selector */
  selector: '[app-build-list-item]',
  /* tslint:enable:component-selector */
  templateUrl: './build-list-item.component.html',
  styleUrls: [
    './build-list-item.component.scss'
  ],
  providers: [DatePipe],
})
export class BuildListItemComponent implements OnChanges {

  @Input() item: any = {};

  @Input() theme: string;

  @HostBinding('class') classes:string[] = [];

  public committerTitle: string;

  constructor(
    private date: DatePipe,
  ) { }

  public ngOnChanges(changes: SimpleChanges) {
    this.committerTitle = this.buildCommitterTitle(changes.item.currentValue);

    let danger, active;
    if (this.item && this.item.outcome === BUILD_OUTCOME.FAILED) {
      danger = true;
    }
    if (this.item && this.item.lifecycle === BUILD_LIFECYCLE.RUNNING) {
      active = true;
    }

    this.classes = [];
    let prefix = 'table';
    if (this.theme === 'dark') {
      prefix = 'bg';
    }
    if (danger) {
      this.classes.push(`${prefix}-danger`);
    }
    if (active) {
      this.classes.push(`${prefix}-primary`);
    }
  }

  private buildCommitterTitle(build): string {
    if (!build) {
      return '';
    }
    const parts = [
      build.committer_name,
    ];
    if (build.committer_email) {
      parts.push(`(${build.committer_email})`);
    }
    if (build.committer_date) {
      parts.push(this.date.transform(build.committer_date, 'medium'));
    }
    return parts.join(' ');
  }

}
