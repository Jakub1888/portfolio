import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMeComponent } from '../pages/about-me/about-me.component';
import { ProjectsComponent } from '../pages/projects/projects.component';

const routes: Routes = [
    { path: '', component: AboutMeComponent },
    {
        path: 'about-me',
        component: AboutMeComponent,
        data: { animation: 'isLeft' }
    },
    {
        path: 'projects',
        component: ProjectsComponent,
        data: { animation: 'isRight' }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
