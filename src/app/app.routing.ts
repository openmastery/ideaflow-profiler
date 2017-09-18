import {Routes, RouterModule} from '@angular/router';
import {
  LoginComponent,
  FaqComponent,
  GlossaryComponent,
  HomeComponent,
  ProjectComponent,
  SubtaskComponent,
  TaskComponent
} from '../views';
import {UserComponent} from '../views/user/user.component';
import {TeamSetupComponent} from '../views/teamsetup/teamsetup.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'Glossary',
    component: GlossaryComponent
  },
  {
    path: 'glossary/task/:id/tag/:tag',
    component: GlossaryComponent
  },
  {
    path: 'IdeaFlow',
    component: HomeComponent
  },
  {
    path: 'TeamSetup',
    component: TeamSetupComponent
  },
  {
    path: 'project/:id',
    component: ProjectComponent
  },
  {
    path: 'task/:id',
    component: TaskComponent
  },
  {
    path: 'task/id/:id/subtask/:subtaskId/journey/:journeyId/pain/:painId',
    component: TaskComponent
  },
  {
    path: 'task/id/:id/subtask/:subtaskId/journey/:journeyId/awesome/:awesomeId',
    component: TaskComponent
  },
  {
    path: 'user/new',
    component: UserComponent
  },
  {
    path: 'user/:id',
    component: UserComponent
  }
];

export const routing = RouterModule.forRoot(routes, {useHash: true});
