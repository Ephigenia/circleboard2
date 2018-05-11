import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export enum BUILD_OUTCOME {
  SUCCESS = 'success',
  FAILED = 'failed',
  CANCELED = 'canceled',
  INFRASTRUCTURE_FAIL = 'infrastructure_fail',
  TIMEDOUT = 'timedout',
  NO_TESTS = 'no_tests',
}

export enum BUILD_LIFECYCLE {
  QUEUED = 'queued',
  SCHEDULED = 'scheduled',
  NOT_RUN = 'not_run',
  NOT_RUNNING = 'not_running',
  RUNNING = 'running',
  FINISHED = 'finished',
}

@Injectable()
export class CircleCiService {

  constructor(
    private http: HttpClient
  ) { }

  public getRecentBuilds(token, limit: number = 30): Observable<any> {
    const url = 'https://circleci.com/api/v1/recent-builds';
    const options = {
      params: {
        'circle-token': token,
        limit: String(limit),
        offset: '0'
      },
    };
    return this.http.get(url, options);
  }

  public groupByWorkflows(builds: any[]) {
    // iterate over all builds and put the jobs which belong to the same
    // workflow into a "jobs" attribuet of that build
    const groupedBuilds = builds.reduce((acc, build) => {
      if (!build.workflows) {
        acc.push(build);
        return acc;
      }

      // find the first build with the same workflow id and append this build
      // to it
      const workflowBuild = builds
        .filter(b => b.workflows)
        .find(b => b.workflows.workflow_id === build.workflows.workflow_id);
      workflowBuild.jobs = workflowBuild.jobs || [];
      workflowBuild.jobs.push(build);

      if (acc.indexOf(workflowBuild) === -1) {
        acc.push(workflowBuild);
      }

      return acc;
    }, []);

    // order the jobs in each grouped build by their creation time
    groupedBuilds
      .filter(b => b.jobs)
      .forEach((build) => {
        // the complete build time of a workflow is the total of each job’s
        // buildtime
        build.build_time_millis = build.jobs.reduce((sum, job) => sum + job.build_time_millis, 0);
        // order the jobs by their creation time
        build.jobs.sort((a, b) => {
          return new Date(a.start_time).getTime() - new Date(b.start_time).getTime();
        });
        build.lifecycle = build.jobs.reduce((lifecycle, b) => {
          if (!lifecycle) {
            lifecycle = b.lifecycle;
          } else if (b.lifecycle !== BUILD_LIFECYCLE.FINISHED) {
            lifecycle = b.lifecycle;
          }
          return lifecycle;
        }, null);
        // reduce the outcome of the workflow to the lowes of the jobs
        build.outcome = build.jobs.reduce((outcome, b) => {
          if (!outcome) {
            return b.outcome;
          } else if (b.outcome !== BUILD_OUTCOME.SUCCESS) {
            return b.outcome;
          }
          return outcome;
        }, null);
      });

    return groupedBuilds;
  }

}
