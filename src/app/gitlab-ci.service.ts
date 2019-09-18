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
      baseUrl = 'https://gitlab.com';
    }
    // remove trailing slash from base Url
    baseUrl = baseUrl.replace(/\/$/, '');
    if (!token) {
      throw new Error('gitlab ci requires token to be working');
    }
    const url = [baseUrl, 'api/v4/projects', encodeURIComponent(project), 'jobs'].join('/');
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

  public groupBuildsByPipeline(builds) {
    const groupedBuilds = builds.reduce((acc, build) => {
      if (!build.pipeline || !build.pipeline.id) {
        acc.push(build);
        return acc;
      }

      // create a pipeline that contains all "jobs" which belong to it
      const pipeline = Object.assign({}, build);
      pipeline.outcome = build.pipeline.status;
      pipeline.lifecycle = build.pipeline.status;
      pipeline.jobs = builds
        .filter(b => b.pipeline && b.pipeline.id === build.pipeline.id)
        .sort((a, b) => {
          if (!a.created_at) { return -1; }
          if (b.created_at) { return 1; }
          return a.created_at.getTime() - b.created.at.getTime();
        });

      // add the pipeline instead of the build to the result array, but only
      // when it’s not allready added
      if (acc.some(b => b.pipeline && b.pipeline.id === build.pipeline.id)) {
        return acc;
      }

      acc.push(pipeline);
      return acc;
    }, []);

    return groupedBuilds;
  }

  public transformBuild(build, project, baseUrl) {
    return {
      id: build.pipeline ? build.pipeline.id : build.id,
      source: 'gitlab',
      vcs_revision: build.commit.id,
      created_at: build.created_at ? new Date(build.created_at) : null,
      start_time: build.started_at ? new Date(build.started_at) : null,
      stop_time: build.finished_at ? new Date(build.finished_at) : null,
      build_time_millis: build.duration * 1000,
      outcome: build.status,
      lifecycle: build.status,
      compare: '',
      job_name: build.name,
      build_url: baseUrl + '/' + project + '-/jobs/' + build.id,
      vcs_url: '',
      reponame: project,
      subject: build.commit.title,
      committer_email: build.commit.committer_email,
      committer_name: build.commit.committer_name,
      committer_date: build.commit.committer_date,
      pipeline: build.pipeline,
    };
  }

}
