import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { BoardConfigService } from './board-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(
    private route: ActivatedRoute,
    private configService: BoardConfigService,
  ) {
    // read ?apiKey=<value> from the uri
    this.route.queryParams
      .map(params => params.apiKey)
      .filter(v => v)
      .subscribe((apiKey) => {
        const config = this.configService.read();
        config.apiKey = apiKey;
        this.configService.save(config);
      })

    this.configService.change$.subscribe((config) => {
      document.body.style.fontSize = `${config.fontSize}px`
    })
  }

  ngOnInit() {}

}
