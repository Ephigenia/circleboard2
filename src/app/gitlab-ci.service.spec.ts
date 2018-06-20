import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { GitlabCiService } from './gitlab-ci.service';

describe('GitlabCiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GitlabCiService],
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ]
    });
  });

  it('should be created', inject([GitlabCiService], (service: GitlabCiService) => {
    expect(service).toBeTruthy();
  }));

  describe('groupBuildsByPipeline', () => {
    const response = [
      {
        id: 1,
        name: 'test:security',
        status: 'failed',
        pipeline: {
          id: 1,
          status: 'failed'
        }
      },
      {
        id: 2,
        status: 'failed',
        name: 'test:outdated',
        pipeline: {
          id: 1,
          status: 'failed'
        }
      },
      {
        id: 3,
        status: 'skipped',
        name: 'test:outdated',
        pipeline: {
          id: 1,
          status: 'failed'
        }
      },
      {
        id: 4,
        status: 'skipped',
        name: 'build',
        pipeline: {
          id: 1,
          status: 'failed'
        }
      },
      {
        id: 5,
        status: 'failed',
        name: 'install',
        pipeline: {
          id: 2,
          status: 'failed'
        }
      },
      {
        id: 6,
        status: 'finished',
        name: 'all',
      }
    ];

    it('only sets the workflow to successfull when all jobs are successful',
      inject([GitlabCiService], (service: GitlabCiService) => {
        const result = service.groupBuildsByPipeline(response);
        expect(result.length).toEqual(3);
        expect(result[0].jobs.length).toEqual(4);
        expect(result[1].jobs.length).toEqual(1);
        expect(result[2].jobs).toBeUndefined();
      }
    ));
    it('uses the pipeline’s status as the aggregated main job status',
      inject([GitlabCiService], (service: GitlabCiService) => {
        const result = service.groupBuildsByPipeline(response);
        expect(result[0].status).toEqual('failed');
      }
    ));
  }); // groupBuildsByPipeline

}); // suite
