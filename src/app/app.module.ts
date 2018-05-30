import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BoardConfigComponent } from './board-config/board-config.component';
import { BuildListComponent } from './build-list/build-list.component';
import { BuildListItemComponent } from './build-list-item/build-list-item.component';
import { CircleCiService } from './circle-ci.service';
import { BoardConfigService } from './board-config.service';
import { GitlabCiService } from './gitlab-ci.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RecentBuildsComponent } from './recent-builds/recent-builds.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    BoardConfigComponent,
    BuildListComponent,
    BuildListItemComponent,
    RecentBuildsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    CircleCiService,
    GitlabCiService,
    BoardConfigService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
