import { Routes, RouterModule } from '@angular/router';
import { LoginComponent,
         AccountComponent,
         FaqComponent,
         GlossaryComponent,
         HomeComponent,
         ProjectComponent,
         SubtaskComponent,
         TaskComponent
} from '../views';


const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'account',
        component: AccountComponent
    },
    {
        path: 'faq',
        component: FaqComponent
    },
    {
        path: 'glossary',
        component: GlossaryComponent
    },
    {
        path: 'home',
        component: HomeComponent
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
];

export const routing = RouterModule.forRoot( routes, { useHash: true } );
