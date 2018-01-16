import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-build-list',
  templateUrl: './build-list.component.html'
})
export class BuildListComponent {

  @Input() items: Array<any> = [];

}
