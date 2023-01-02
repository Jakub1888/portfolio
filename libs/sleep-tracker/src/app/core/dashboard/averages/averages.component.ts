import { Component, OnInit } from '@angular/core';
import { SleepTrackerService } from '../../services/sleep-tracker.service';

@Component({
    selector: 'st-averages',
    templateUrl: './averages.component.html',
    styleUrls: ['./averages.component.scss']
})
export class AveragesComponent implements OnInit {
    constructor(private readonly sleepTrackerService: SleepTrackerService) {}

    ngOnInit(): void {}

    loadAveragesForSleepData() {
        this.sleepTrackerService.getAveragesForSleepData();
    }
}
