import { Component } from '@angular/core';

import { BoardConfigService, BoardConfig } from '../board-config.service';

@Component({
  selector: 'app-board-config',
  templateUrl: './board-config.component.html'
})
export class BoardConfigComponent {

  public config: BoardConfig;

  public baseUrl: string;

  public constructor(
    private configService: BoardConfigService
  ) {
    this.config = this.configService.read();
    this.baseUrl = `${window.location.origin}`;
  }

  public submit() {
    this.configService.save(this.config);
  }
}
