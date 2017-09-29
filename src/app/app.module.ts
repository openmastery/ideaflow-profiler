import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'angular2-moment/moment.module';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { ChartsModule } from 'ng2-charts';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { AppComponent } from './app.component';
import { MaterialModule } from '@angular/material';
import {
  LoginComponent,
  FaqComponent,
  GlossaryComponent,
  HomeComponent,
  ProjectComponent,
  SubtaskComponent,
  TaskComponent,
  TimelineComponent,
  JourneyComponent,
  HaystackComponent,
  MetricsComponent,
  UserComponent
} from '../views';

import { routing } from './app.routing';


import {
  RequestOptionsProvider,
  GlossaryService,
  TaskService,
  UserService,
  FaqService,
} from '../services';
import {CapitalizePipe} from '../pipes/capitalizePipe';
import {InlineEditComponent} from '../custom/inline-edit/inline-edit.component';
import {WtfsComponent} from '../views/wtfs/wtfs.component';
import {TermsComponent} from '../views/terms/terms.component';
import {TeamSetupComponent} from '../views/teamsetup/teamsetup.component';

@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    LoginComponent,
    FaqComponent,
    GlossaryComponent,
    HomeComponent,
    ProjectComponent,
    SubtaskComponent,
    TaskComponent,
    TimelineComponent,
    JourneyComponent,
    HaystackComponent,
    MetricsComponent,
    UserComponent,
    WtfsComponent,
    TermsComponent,
    CapitalizePipe ,
    InlineEditComponent,
    TeamSetupComponent
],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    routing,
    MomentModule,
    InfiniteScrollModule,
    ChartsModule,
    Ng2GoogleChartsModule,
    MaterialModule.forRoot()
  ],
  providers: [RequestOptionsProvider, TaskService, UserService, GlossaryService, FaqService],
  bootstrap: [AppComponent]
})
export class AppModule { }
