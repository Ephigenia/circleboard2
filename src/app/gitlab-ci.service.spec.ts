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
        status: "skipped",
        pipeline: {
          id: 1,
          status: "failed"
        }
      },
      {
        id: 2,
        status: "skipped",
        name: 'test:outdated',
        pipeline: {
          id: 1,
          status: "failed"
        }
      },
      {
        id: 3,
        status: "skipped",
        name: 'build',
        pipeline: {
          id: 1,
          status: "failed"
        }
      },
      {
        id: 5,
        status: "finished",
        name: "all",

      }
    ];

    it('only sets the workflow to successfull when all jobs are successful',
      inject([GitlabCiService], (service: GitlabCiService) => {
        const result = service.groupBuildsByPipeline(response);
        expect(result.length).toEqual(2);
        expect(result[0].jobs.length).toEqual(3);
        expect(result[1].jobs).toBeUndefined();
      }
    ));
  }); // groupBuildsByPipeline

}); // suite
