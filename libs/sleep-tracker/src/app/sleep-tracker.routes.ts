import { Route } from '@angular/router';
import { DashboardFormComponent } from './core/dashboard/dashboard-form/dashboard-form.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';

export const sleepTrackerRoutes: Route[] = [
    {
        path: '',
        component: DashboardComponent,
        children: [{ path: 'form', component: DashboardFormComponent, outlet: 'st' }]
    }
];
