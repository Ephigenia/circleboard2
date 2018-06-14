import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

const FONT_SIZE_MAX = 32;
const FONT_SIZE_MIN = 8;

export class BoardConfig {

  public apiToken = '';
  private _groupWorkflows = false;
  private _refreshInterval = 20;
  private _fontSize = 16;
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
