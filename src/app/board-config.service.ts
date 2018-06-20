import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

const FONT_SIZE_MAX = 32;
const FONT_SIZE_MIN = 8;
const MAX_REFRESH_INTERVAL = 3600;
const MIN_REFRESH_INTERVAL = 10;

export class BoardConfig {

  public apiToken = '';
  private _groupWorkflows = false;
  private _refreshInterval = 20;
  private _fontSize = 16; // in seconds
  private _timeout = 5; // in seconds
  public gitlabProjects = [];

  public theme = 'dark';

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

  get fontSize(): number {
    return this._fontSize;
  }
  set fontSize(value: number) {
    this._fontSize = Math.round(Math.min(Math.max(value, FONT_SIZE_MIN), FONT_SIZE_MAX));
  }

  get timeout(): number {
    return this._timeout;
  }
  set timeout(value: number) {
    const minTimeout = 1;
    const maxTimeout = this.refreshInterval;
    this._timeout = Math.round(Math.min(Math.max(value, minTimeout), maxTimeout));
  }

  get refreshInterval(): number {
    return this._refreshInterval;
  }
  set refreshInterval(value: number) {
    this._refreshInterval = Math.min(Math.max(value, MIN_REFRESH_INTERVAL), MAX_REFRESH_INTERVAL);
  }

  constructor(config: object|null = null) {
    if (config) {
      Object.assign(this, config);
    }
  }

  public parseGitLabString(csvString: string): any[] {
    return decodeURIComponent(csvString)
      .split(/[\n\r]/)
      .map(line => line.split(/[,;]/))
      .filter(v => v && v.length > 1)
      .map((csvRow) => {
        return {
          name: csvRow[0],
          token: csvRow[1],
          baseUrl: csvRow[2] || null
        };
      });
  }

  public merge(config: object) {
    if (config['groupWorkflows']) {
      this.groupWorkflows = config['groupWorkflows'];
    }
    this.refreshInterval = config['refreshInterval'] || this.refreshInterval;
    this.apiToken = config['apiToken'] || this.apiToken;
    this.fontSize = config['fontSize'] || this.fontSize;
    this.theme = config['theme'] || this.theme;
    this.timeout = config['timeout'] || this.timeout;
    // convert gitlab csv string
    if (typeof config['gitlab'] === 'string') {
      this.gitlabProjects = this.parseGitLabString(config['gitlab']);
    }
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
