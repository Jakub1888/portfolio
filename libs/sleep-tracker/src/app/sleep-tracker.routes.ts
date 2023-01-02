import { Route } from '@angular/router';
import { DashboardFormComponent } from './core/dashboard/dashboard-form/dashboard-form.component';
import { DayListComponent } from './core/dashboard/day-list/day-list.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { AuthGuard } from '@portfolio/ui-components';
import { DayDetailComponent } from './core/dashboard/day-list/day-detail/day-detail.component';
import { AveragesComponent } from './core/dashboard/averages/averages.component';

export const sleepTrackerRoutes: Route[] = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'always',
        children: [
            { path: 'form', component: DashboardFormComponent, outlet: 'st' },
            {
                path: 'list',
                component: DayListComponent,
                outlet: 'st',
                children: [{ path: 'detail', component: DayDetailComponent, outlet: 'day' }]
            },
            { path: 'averages', component: AveragesComponent, outlet: 'st' }
        ]
    }
];
