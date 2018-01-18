import { Component, Input, HostBinding } from '@angular/core';
import { SimpleChanges, OnChanges } from '@angular/core';
import { DatePipe } from '@angular/common';

import { BUILD_LIFECYCLE, BUILD_OUTCOME } from '../circle-ci.service';

@Component({
  selector: 'app-build-list-item',
  templateUrl: './build-list-item.component.html',
  providers: [DatePipe],
})
export class BuildListItemComponent implements OnChanges {

  @Input() item: any = {};

  @HostBinding('class.table-danger')
    danger = false;
  @HostBinding('class.table-primary')
    active = false;

  public committerTitle: string;

  constructor(
    private date: DatePipe
  ) { }

  public ngOnChanges(changes: SimpleChanges) {
    this.committerTitle = this.buildCommitterTitle(changes.item.currentValue);
    if (this.item && this.item.outcome === BUILD_OUTCOME.FAILED) {
      this.danger = true;
    }
    if (this.item && this.item.lifecycle === BUILD_LIFECYCLE.RUNNING) {
      this.active = true;
    }
  }

  private buildCommitterTitle(build): string {
    if (!build) { return ''; }
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
