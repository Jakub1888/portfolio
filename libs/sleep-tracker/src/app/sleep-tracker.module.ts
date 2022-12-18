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

@NgModule({
    imports: [
        CommonModule,
        UiComponentsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        NgxMaterialTimepickerModule,
        RouterModule.forChild(sleepTrackerRoutes)
    ],
    declarations: [DashboardComponent, NavigationComponent, DashboardFormComponent]
})
export class SleepTrackerModule {}
