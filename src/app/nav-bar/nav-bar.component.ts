import { Component } from '@angular/core';

import { BoardConfigService } from '../board-config.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent {

  public theme: string;

  constructor(
    private configService: BoardConfigService
  ) {
    this.configService.change$.subscribe((config) => {
      this.theme = config.theme;
    });
  }

  public increaseFontSize() {
    this.setFontSize(++this.configService.config.fontSize);
  }

  public decreaseFontSize() {
    this.setFontSize(--this.configService.config.fontSize);
  }

  public setFontSize(sizePixel: number) {
    const config = this.configService.read();
    config.fontSize = sizePixel;
    this.configService.save(config);
    return this;
  }
}
