import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { sleepTrackerRoutes } from './sleep-tracker.routes';
import { HomeComponent } from './core/home/home.component';
import { NavigationComponent } from './core/navigation/navigation.component';

@NgModule({
    imports: [CommonModule, RouterModule.forChild(sleepTrackerRoutes)],
    declarations: [HomeComponent, NavigationComponent]
})
export class SleepTrackerModule {}
