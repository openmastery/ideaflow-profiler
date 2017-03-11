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
        path: 'subtask',
        component: SubtaskComponent
    },
    {
        path: 'task/:id',
        component: TaskComponent
    }
];

export const routing = RouterModule.forRoot( routes, { useHash: true } );
