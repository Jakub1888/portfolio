import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Averages } from '@portfolio/interfaces';
import { Observable } from 'rxjs';
import { SleepTrackerService } from '../../services/sleep-tracker.service';

@Component({
    selector: 'st-averages',
    templateUrl: './averages.component.html',
    styleUrls: ['./averages.component.scss']
})
export class AveragesComponent implements OnInit {
    averages$: Observable<Averages> = this.sleepTrackerService.averages$;
    limit = 7;
    enteredValues = new FormControl(7);
    convertToHourString = SleepTrackerService.convertToHourString;

    constructor(private readonly sleepTrackerService: SleepTrackerService) {}

    ngOnInit(): void {
        this.loadAveragesForSleepData(7);
    }

    loadAveragesForSleepData(limit: number) {
        this.sleepTrackerService.getAveragesForSleepData(limit);
    }

    getTimeInBed(awakeTime: number): string {
        const minutesInDay = 1440;
        const time = minutesInDay - +awakeTime.toFixed();
        return this.convertToHourString(time);
    }
}
