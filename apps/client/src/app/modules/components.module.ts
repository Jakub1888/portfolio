import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { UiComponentsModule } from '@portfolio/ui-components';
import { InterfacesModule } from '@portfolio/interfaces';
import { HttpClientModule } from '@angular/common/http';
import { NavigationComponent } from '../core/components/navigation/navigation.component';
import { AboutMeComponent } from '../pages/about-me/about-me.component';
import { ProjectsComponent } from '../pages/projects/projects.component';
import { SocialsComponent } from '../core/components/socials/socials.component';
import { AuthComponent } from '../core/auth/auth.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NotFoundComponent } from '../errors/not-found/not-found.component';
import { HomeComponent } from '../pages/home/home.component';
import { LearningCardComponent } from '../pages/about-me/learning-card/learning-card.component';
import { MatCardModule } from '@angular/material/card';
@NgModule({
    declarations: [
        NavigationComponent,
        AboutMeComponent,
        ProjectsComponent,
        SocialsComponent,
        AuthComponent,
        NotFoundComponent,
        HomeComponent,
        LearningCardComponent
    ],
    imports: [
        CommonModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatSlideToggleModule,
        MatInputModule,
        MatListModule,
        UiComponentsModule,
        InterfacesModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        MatCardModule,
        ToastrModule.forRoot({
            positionClass: 'toast-bottom-right'
        })
    ],
    exports: [
        NavigationComponent,
        AboutMeComponent,
        ProjectsComponent,
        SocialsComponent,
        UiComponentsModule,
        InterfacesModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HomeComponent,
        NotFoundComponent,
        LearningCardComponent,
        ToastrModule
    ]
})
export class ComponentsModule {}
