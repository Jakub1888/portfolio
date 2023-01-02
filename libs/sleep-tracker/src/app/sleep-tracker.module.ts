import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { sleepTrackerRoutes } from './sleep-tracker.routes';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { NavigationComponent } from './core/navigation/navigation.component';
import { DashboardFormComponent } from './core/dashboard/dashboard-form/dashboard-form.component';
import { UiComponentsModule } from '@portfolio/ui-components';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { DayListComponent } from './core/dashboard/day-list/day-list.component';
import { DayDetailComponent } from './core/dashboard/day-list/day-detail/day-detail.component';
import { AveragesComponent } from './core/dashboard/averages/averages.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    imports: [
        CommonModule,
        UiComponentsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatChipsModule,
        MatIconModule,
        MatTooltipModule,
        NgxMaterialTimepickerModule,
        RouterModule.forChild(sleepTrackerRoutes)
    ],
    declarations: [
        DashboardComponent,
        NavigationComponent,
        DashboardFormComponent,
        DayListComponent,
        DayDetailComponent,
        AveragesComponent
    ]
})
export class SleepTrackerModule {}
