import { Routes, RouterModule } from '@angular/router';
import { ElementsComponent,
         LoginComponent,
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
        path: 'elements',
        component: ElementsComponent
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
        path: 'project',
        component: ProjectComponent
    },
    {
        path: 'subtask',
        component: SubtaskComponent
    },
    {
        path: 'task',
        component: TaskComponent
    }
];

export const routing = RouterModule.forRoot( routes, { useHash: true } );
