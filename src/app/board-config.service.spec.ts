import { TestBed, inject } from '@angular/core/testing';

import { BoardConfig } from './board-config.service';

describe('BoardConfig', () => {
  let config;
  beforeEach(() => {
    config = new BoardConfig({
      apiToken: 'initial-api-token',
      groupWorkflows: false
    });
  });

  describe('properties', () => {
    describe('groupWorkflows', () => {
      it('converts a "yes" to true', () => {
        config.groupWorkflows = 'yes';
        expect(config.groupWorkflows).toBeTruthy();
      });
      it('converts a "true" (string) to true', () => {
        config.groupWorkflows = 'true';
        expect(config.groupWorkflows).toBeTruthy();
      });
      it('converts a "no" to false', () => {
        config.groupWorkflows = 'no';
        expect(config.groupWorkflows).toBeFalsy();
      });
    }); // groupworkflows

    describe('timeout', () => {
      it('cannot be larger than refreshInterval', () => {
        config.refreshInterval = 10;
        config.timeout = 11;
        expect(config.timeout).toEqual(10);
      });
      it('cannot be smaller than 1', () => {
        config.timeout = 0;
        expect(config.timeout).toEqual(1);
      });
    }); // timeout

    describe('refreshInterval', () => {
      it('cannot be lower than 10', () => {
        config.refreshInterval = 2;
        expect(config.refreshInterval).toEqual(10);
      });
      it('can be a float', () => {
        config.refreshInterval = 13.1;
        expect(config.refreshInterval).toEqual(13.1);
      });
      it('cannot be larger than 3600', () => {
        config.refreshInterval = 3601;
        expect(config.refreshInterval).toEqual(3600);
      });
    }); // refreshInterval

    describe('font-size', () => {
      it('cannot be lower than 8', () => {
        config.fontSize = 2;
        expect(config.fontSize).toEqual(8);
      });
      it('cannot be a fractional number', () => {
        config.fontSize = 9.2;
        expect(config.fontSize).toEqual(9);
      });
      it('cannot be larger than 32', () => {
        config.fontSize = 829;
        expect(config.fontSize).toEqual(32);
      });
    }); // font-size

  }); // properties

  describe('merge', () => {
    it('converts the gitlab string to single project configs', () => {
      const csv = 'org/project,token,,%0Aorg2/project2,token2,baseUrl,%0A';
      config.merge({ gitlab: csv });
      expect(config.gitlabProjects.length).toEqual(2);
      expect(config.gitlabProjects[0].name).toEqual('org/project');
      expect(config.gitlabProjects[0].token).toEqual('token');
      expect(config.gitlabProjects[0].baseUrl).toEqual(null);
    });

    it('doesn’t change any config vars when the object is empty', () => {
      config.merge({});
      expect(config.apiToken).toEqual('initial-api-token');
      expect(config.groupWorkflows).toBeFalsy();
    });
    it('merges from the given params object', () => {
      config.merge({ apiToken: 'new-api-token' });
      expect(config.apiToken).toEqual('new-api-token');
      expect(config.groupWorkflows).toEqual(false);

      config.merge({ groupWorkflows: 'yes' });
      expect(config.apiToken).toEqual('new-api-token');
      expect(config.groupWorkflows).toEqual(true);
    });
  });
});
