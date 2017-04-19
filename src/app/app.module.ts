import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'angular2-moment/moment.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ChartsModule } from 'ng2-charts';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { AppComponent } from './app.component';
import { MaterialModule } from '@angular/material';
import {
  LoginComponent,
  AccountComponent,
  FaqComponent,
  GlossaryComponent,
  HomeComponent,
  ProjectComponent,
  SubtaskComponent,
  TaskComponent,
  TimelineComponent,
  JourneyComponent,
  HaystackComponent,
  MetricsComponent
} from '../views';

import { routing } from './app.routing';

import { Task } from '../models/task';

import {
  RequestOptionsProvider,
  GlossaryService,
  TaskService,
  FaqService,
} from '../services';
import {CapitalizePipe} from "../pipes/capitalizePipe";
import {InlineEditComponent} from "../custom/inline-edit/inline-edit.component";
import {WtfsComponent} from "../views/wtfs/wtfs.component";
import {TermsComponent} from "../views/terms/terms.component";


@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    LoginComponent,
    AccountComponent,
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
    WtfsComponent,
    TermsComponent,
    CapitalizePipe ,
    InlineEditComponent
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
  providers: [RequestOptionsProvider, TaskService, GlossaryService, FaqService],
  bootstrap: [AppComponent]
})
export class AppModule { }
