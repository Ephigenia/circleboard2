import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CircleCiService, BUILD_OUTCOME } from './circle-ci.service';

describe('CircleCiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CircleCiService],
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ]
    });
  });

  it('should be created', inject([CircleCiService], (service: CircleCiService) => {
    expect(service).toBeTruthy();
  }));

  describe('groupByWorkflows', () => {
    it('only sets the workflow to successfull when all jobs are successful',
      inject([CircleCiService], (service: CircleCiService) => {
      const data = [
        {
          workflows: { workflow_id: 'cef3a3a5-9d8d-46db-b10e-964bd2fca3bb' },
          outcome: BUILD_OUTCOME.SUCCESS,
        },
        {
          workflows: { workflow_id: 'cef3a3a5-9d8d-46db-b10e-964bd2fca3bb' },
          outcome: BUILD_OUTCOME.SUCCESS,
        },
        {
          workflows: { workflow_id: 'cef3a3a5-9d8d-46db-b10e-964bd2fca3bb' },
          outcome: BUILD_OUTCOME.SUCCESS,
        }
      ];
      const result = service.groupByWorkflows(data);
      expect(result[0].outcome).toEqual(BUILD_OUTCOME.SUCCESS);
    }));
    it('failes the workflow when only one is failed',
      inject([CircleCiService], (service: CircleCiService) => {
      const data = [
        {
          workflows: { workflow_id: 'cef3a3a5-9d8d-46db-b10e-964bd2fca3bb' },
          outcome: BUILD_OUTCOME.SUCCESS,
        },
        {
          workflows: { workflow_id: 'cef3a3a5-9d8d-46db-b10e-964bd2fca3bb' },
          outcome: BUILD_OUTCOME.FAILED,
        },
        {
          workflows: { workflow_id: 'cef3a3a5-9d8d-46db-b10e-964bd2fca3bb' },
          outcome: BUILD_OUTCOME.SUCCESS,
        }
      ];
      const result = service.groupByWorkflows(data);
      expect(result[0].outcome).toEqual(BUILD_OUTCOME.FAILED);
    }));

    it('orders the jobs by their start time',
      inject([CircleCiService], (service: CircleCiService) => {
      const buildsWithWorkflows = [
        // two items that belong to the same workflow but have different names
        // and outcomes
        {
          start_time: '2013-02-12T21:33:38Z',
          // some other attributes usually part of the circleci response
          // are omitted
          workflows: {
            job_name: 'deploy_build',
            job_id: 'ac6d9473-9b38-48ce-a78e-b81148aa93b6',
            workflow_id: '6c834b3e-b511-46f9-9ead-d1e1c7bfbca1',
            workspace_id: 'cd389f89-6830-48ee-9164-1460ecd6d161',
            workflow_name: 'default'
          },
          outcome: BUILD_OUTCOME.SUCCESS,
        },
        {
          start_time: '2013-01-12T21:33:38Z',
          // some other attributes usually part of the circleci response
          // are omitted
          workflows: {
            job_name: 'setup',
            job_id: 'c6deceac-aa0d-4e85-b667-dac1aa20d566',
            workflow_id: 'd4b8a55b-f8dc-4e13-bb7a-a70a5e860045',
            workspace_id: 'cd389f89-6830-48ee-9164-1460ecd6d161',
            workflow_name: 'default'
          },
          outcome: BUILD_OUTCOME.SUCCESS,
        },
        {
          start_time: '2013-02-13T21:33:38Z',
          // some other attributes usually part of the circleci response
          // are omitted
          workflows: {
            job_name: 'test:lint',
            job_id: '87418b8d-0c15-49ab-ad4f-fe13b8a60c87',
            workflow_id: '6c834b3e-b511-46f9-9ead-d1e1c7bfbca1',
            workspace_id: 'cd389f89-6830-48ee-9164-1460ecd6d161',
            workflow_name: 'default'
          },
          outcome: BUILD_OUTCOME.SUCCESS,
        },
      ];
      const result = service.groupByWorkflows(buildsWithWorkflows);
      const firstWorkflow = result[0];
      expect(firstWorkflow.jobs[0].start_time).toBeLessThan(firstWorkflow.jobs[1].start_time);
    }));

    it('groups the jobs which belong to the same workflow into a new property "jobs"',
      inject([CircleCiService], (service: CircleCiService) => {
      const buildsWithWorkflows = [
        // two items that belong to the same workflow but have different names
        // and outcomes
        {
          start_time: '2013-02-12T21:33:38Z',
          // some other attributes usually part of the circleci response
          // are omitted
          workflows: {
            job_name: 'deploy_build',
            job_id: 'ac6d9473-9b38-48ce-a78e-b81148aa93b6',
            workflow_id: '6c834b3e-b511-46f9-9ead-d1e1c7bfbca1',
            workspace_id: 'cd389f89-6830-48ee-9164-1460ecd6d161',
            workflow_name: 'default'
          },
          outcome: BUILD_OUTCOME.SUCCESS,
        },
        {
          start_time: '2013-01-12T21:33:38Z',
          // some other attributes usually part of the circleci response
          // are omitted
          workflows: {
            job_name: 'setup',
            job_id: 'c6deceac-aa0d-4e85-b667-dac1aa20d566',
            workflow_id: 'd4b8a55b-f8dc-4e13-bb7a-a70a5e860045',
            workspace_id: 'cd389f89-6830-48ee-9164-1460ecd6d161',
            workflow_name: 'default'
          },
          outcome: BUILD_OUTCOME.SUCCESS,
        },
        {
          start_time: '2013-02-13T21:33:38Z',
          // some other attributes usually part of the circleci response
          // are omitted
          workflows: {
            job_name: 'test:lint',
            job_id: '87418b8d-0c15-49ab-ad4f-fe13b8a60c87',
            workflow_id: '6c834b3e-b511-46f9-9ead-d1e1c7bfbca1',
            workspace_id: 'cd389f89-6830-48ee-9164-1460ecd6d161',
            workflow_name: 'default'
          },
          outcome: BUILD_OUTCOME.SUCCESS,
        },
      ];
      const result = service.groupByWorkflows(buildsWithWorkflows);
      expect(result.length).toEqual(2);
      expect(result[0].jobs).toEqual(jasmine.any(Array));
      expect(result[0].jobs.length).toEqual(2);
      expect(result[1].jobs).toEqual(jasmine.any(Array));
      expect(result[1].jobs.length).toEqual(1);
    }));
  });

});
