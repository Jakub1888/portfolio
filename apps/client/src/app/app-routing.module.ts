import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { HomeComponent } from './pages/home/home.component';
import { ProjectsComponent } from './pages/projects/projects.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'about-me',
        component: AboutMeComponent,
        data: { animation: 'isAboutMe' },
    },
    {
        path: 'projects',
        component: ProjectsComponent,
        data: { animation: 'isProjects' },
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
