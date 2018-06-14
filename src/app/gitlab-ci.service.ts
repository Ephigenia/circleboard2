import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

export interface GitLabProjectListItem {
  name: string;
  token: string;
  baseUrl: string|null;
}

@Injectable()
export class GitlabCiService {

  constructor(
    private http: HttpClient
  ) { }

  public getProjectBuilds(
    project: string,
    token: string,
    baseUrl: string = ''
  ) {
    if (!baseUrl) {
      baseUrl = 'https://gitlab.com/api/v4/projects';
    }
    if (!token) {
      throw new Error('gitlab ci requires token to be working');
    }
    const url = [baseUrl, encodeURIComponent(project), 'jobs'].join('/');
    const options = {
      headers: {
        'PRIVATE-TOKEN': token
      }
    };
    return this.http.get(url, options).pipe(
      map((builds: any[]) => {
        return builds.map((build) => this.transformBuild(build, project, baseUrl));
      })
    );
  }

  public transformBuild(build, project, baseUrl) {
    return {
      source: 'gitlab',
      vcs_revision: build.commit.id,
      created_at: build.created_at,
      start_time: build.started_at,
      stop_time: build.finished_at,
      build_time_millis: build.duration * 1000,
      outcome: build.status,
      lifecycle: build.status,
      compare: '',
      build_url: '',
      vcs_url: '',
      reponame: project,
      build_num: build.id,
      subject: build.commit.title,
      committer_email: build.commit.committer_email,
      committer_name: build.commit.committer_name,
      committer_date: build.commit.committer_date,
    };
  }

}
