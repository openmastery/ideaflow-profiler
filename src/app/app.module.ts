import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'angular2-moment/moment.module';

import { AppComponent } from './app.component';
import { MaterialModule } from '@angular/material';
import {
  ElementsComponent,
  LoginComponent,
  AccountComponent,
  FaqComponent,
  GlossaryComponent,
  HomeComponent,
  ProjectComponent,
  SubtaskComponent,
  TaskComponent
} from '../views';
import { routing } from './app.routing';

import { Task } from '../models/task';

import {
  RequestOptionsProvider,
  TaskService
} from '../services';


@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    ElementsComponent,
    LoginComponent,
    AccountComponent,
    FaqComponent,
    GlossaryComponent,
    HomeComponent,
    ProjectComponent,
    SubtaskComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    routing,
    MomentModule,
    MaterialModule.forRoot()
  ],
  providers: [RequestOptionsProvider, TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
