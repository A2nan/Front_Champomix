import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserComponent } from './component/user/user.component';
import { SettingsComponent } from './component/settings/settings.component';
import { ChatComponent } from './component/chat/chat.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { UserdetailComponent } from './component/user/userdetail/userdetail.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: 'dashboard',
        pathMatch: 'full',
        component: DashboardComponent
    },
    {
        path: 'user',
        pathMatch: 'full',
        component: UserComponent
    },
    {
        path: 'user/:id',
        pathMatch: 'full',
        component: UserdetailComponent
    },
    {
        path: 'settings',
        pathMatch: 'full',
        component: SettingsComponent
    },
    {
        path: 'chat',
        pathMatch: 'full',
        component: ChatComponent
    },
    {
        path: '404',
        pathMatch: 'full',
        component: PageNotFoundComponent
    },     
    {
        path: '**',
        component: PageNotFoundComponent
    }
];
