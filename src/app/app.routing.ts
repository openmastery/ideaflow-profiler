import { Routes, RouterModule } from '@angular/router';
import { ElementsComponent,
         LoginComponent
} from '../views';


const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'elements',
        component: ElementsComponent
    }
];

export const routing = RouterModule.forRoot( routes, { useHash: true } );
