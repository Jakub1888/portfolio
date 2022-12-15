import { Route } from '@angular/router';
import { HomeComponent } from './core/home/home.component';

export const sleepTrackerRoutes: Route[] = [
    {
        path: '',
        component: HomeComponent
        // children: [{ path: 'test', component: TestComponent, outlet: 'sleepTracker' }]
    }
];
