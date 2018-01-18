import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const FONT_SIZE_MAX = 32;
const FONT_SIZE_MIN = 8;

export class BoardConfig {

  public apiKey = '';
  private _groupWorkflows = false;
  private _refreshInterval = 20;
  private _fontSize = 16;

  get groupWorkflows() {
    return this._groupWorkflows;
  }
  set groupWorkflows(value) {
    if (typeof value === 'string') {
      value = /true|1|yes|ja/i.test(value);
    } else {
      value = Boolean(value);
    }
    this._groupWorkflows = value;
  }

  get fontSize() {
    return this._fontSize;
  }
  set fontSize(value) {
    this._fontSize = Math.min(Math.max(value, FONT_SIZE_MIN), FONT_SIZE_MAX);
  }

  get refreshInterval() {
    return this._refreshInterval;
  }
  set refreshInterval(value) {
    this._refreshInterval = Math.min(Math.max(value, 10), 3600);
  }

  constructor(config: object|null = null) {
    if (config) {
      Object.assign(this, config);
    }
  }

  public merge(config: object) {
    if (config['groupWorkflows']) {
      this.groupWorkflows = config['groupWorkflows'];
    }
    this.refreshInterval = config['refreshInterval'] || this.refreshInterval;
    this.apiKey = config['apiKey'] || this.apiKey;
    this.fontSize = config['fontSize'] || this.fontSize;
    return this;
  }
}

@Injectable()
export class BoardConfigService {

  public config = new BoardConfig();
  public change$: BehaviorSubject<BoardConfig> = new BehaviorSubject(this.config);

  private key = 'circleboard3-config';

  public constructor() {
    this.config = this.read();
    this.change$.next(this.config);
  }

  public save(config: any) {
    const json = JSON.stringify(config);
    if (localStorage) {
      localStorage.setItem(this.key, json);
    }
    this.change$.next(config);
    return this;
  }

  public read(): any {
    if (localStorage) {
      const json = localStorage.getItem(this.key);
      const parsed = JSON.parse(json);
      return new BoardConfig(parsed);
    }
    return new BoardConfig();
  }
}
