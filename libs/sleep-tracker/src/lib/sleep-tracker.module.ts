import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { sleepTrackerRoutes } from './lib.routes';

@NgModule({
    imports: [CommonModule, RouterModule.forChild(sleepTrackerRoutes)]
})
export class SleepTrackerModule {}
