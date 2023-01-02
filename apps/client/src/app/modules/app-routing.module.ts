import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from '../core/auth/auth.component';
import { NotFoundComponent } from '../errors/not-found/not-found.component';
import { AuthGuard } from '@portfolio/ui-components';
import { LoggedInGuard } from '@portfolio/ui-components';
import { AboutMeComponent } from '../pages/about-me/about-me.component';
import { HomeComponent } from '../pages/home/home.component';
import { ProjectsComponent } from '../pages/projects/projects.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'about-me',
        component: AboutMeComponent,
        data: { animation: 'isLeft' }
    },
    {
        path: 'projects',
        component: ProjectsComponent,
        data: { animation: 'isRight' }
    },
    {
        path: 'projects/authentication',
        runGuardsAndResolvers: 'always',
        canActivate: [LoggedInGuard],
        component: AuthComponent
    },
    {
        path: 'projects/sleep-tracker',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        loadChildren: () => import('@portfolio/sleep-tracker').then((m) => m.SleepTrackerModule)
    },
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
