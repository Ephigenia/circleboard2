import { Component } from '@angular/core';

import { BoardConfigService } from '../board-config.service';

@Component({
  selector: 'app-board-config',
  templateUrl: './board-config.component.html'
})
export class BoardConfigComponent {

  public config: object = {};

  public constructor(
    private configService: BoardConfigService
  ) {
    this.config = this.configService.read();
  }

  public submit() {
    this.configService.save(this.config);
  }
}
