import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { UiComponentsModule } from '@portfolio/ui-components';
import { InterfacesModule } from '@portfolio/interfaces';
import { HttpClientModule } from '@angular/common/http';
import { NavigationComponent } from '../core/components/navigation/navigation.component';
import { AboutMeComponent } from '../pages/about-me/about-me.component';
import { ProjectsComponent } from '../pages/projects/projects.component';
import { SocialsComponent } from '../core/components/socials/socials.component';

@NgModule({
    declarations: [NavigationComponent, AboutMeComponent, ProjectsComponent, SocialsComponent],
    imports: [
        CommonModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatSlideToggleModule,
        MatListModule,
        UiComponentsModule,
        InterfacesModule,
        HttpClientModule
    ],
    exports: [
        NavigationComponent,
        AboutMeComponent,
        ProjectsComponent,
        SocialsComponent,
        UiComponentsModule,
        InterfacesModule
    ]
})
export class ComponentsModule {}
