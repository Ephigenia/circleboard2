import { Component } from '@angular/core';

import { BoardConfigService, BoardConfig } from '../board-config.service';
import { GitLabProjectListItem } from './../gitlab-ci.service';

@Component({
  selector: 'app-board-config',
  templateUrl: './board-config.component.html'
})
export class BoardConfigComponent {

  public config: BoardConfig;

  public constructor(
    private configService: BoardConfigService
  ) {
    this.config = this.configService.read();
  }

  public submit() {
    this.configService.save(this.config);
  }

  public addEmptyGitlabProject() {
    let template = <GitLabProjectListItem>{
      name: '',
      token:'',
      baseUrl: ''
    };
    if (this.config.gitlabProjects.length) {
      template = <GitLabProjectListItem> Object.assign(
        {},
        this.config.gitlabProjects[this.config.gitlabProjects.length - 1]
      );
      template.name = '';
    }
    this.config.gitlabProjects.push(template);
    return true;
  }

  public removeGitLabProject(index) {
    return this.config.gitlabProjects.splice(index, 1);
  }
}
