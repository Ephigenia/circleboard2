import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecentBuildsComponent } from './recent-builds/recent-builds.component';
import { BoardConfigComponent } from './board-config/board-config.component';

const appRoutes: Routes = [
  {
    path: 'recent-builds',
    component: RecentBuildsComponent
  },
  {
    path: 'config',
    component: BoardConfigComponent
  },
  // default path
  { path: '',   redirectTo: 'recent-builds', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
