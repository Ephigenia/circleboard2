import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const FONT_SIZE_MAX = 32;
const FONT_SIZE_MIN = 8;

export class BoardConfig {

  public apiKey: string = '';
  public groupWorkflows: boolean = false;

  private _refreshInterval: number = 20;
  private _fontSize: number = 16;

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
    this._refreshInterval = Math.min(Math.max(value, 15), 3600);
  }

  constructor(config: object|null = null) {
    if (config) {
      Object.assign(this, config);
    }
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
