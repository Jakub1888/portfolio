import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SleepData } from '@portfolio/interfaces';
import { ConfirmDialogComponent } from '@portfolio/ui-components';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY, Observable } from 'rxjs';
import { SleepTrackerService } from '../../../services/sleep-tracker.service';

@Component({
    selector: 'st-day-detail',
    styleUrls: ['./day-detail.component.scss'],
    template: `
        <div *ngIf="sleepDay$ | async as sleepDay">
            <div *ngIf="sleepDay.sleepData && !loading">
                <div class="detail-header">
                    <h1>{{ sleepDay.sleepData.dateOfSleep | date: 'fullDate' }}</h1>
                    <span class="action-btns">
                        <button
                            matTooltip="Edit"
                            class="action-btn"
                            (click)="onNavigateToEdit(sleepDay.sleepData.dateOfSleep)"
                        >
                            <mat-icon aria-hidden="false" aria-label="Edit" fontIcon="edit"></mat-icon>
                        </button>
                        <button
                            matTooltip="Delete"
                            class="action-btn"
                            (click)="openConfirmDialog(sleepDay.sleepData._id)"
                        >
                            <mat-icon aria-hidden="false" aria-label="Delete" fontIcon="delete"></mat-icon>
                        </button>
                    </span>
                </div>

                <table class="data-summary">
                    <tr class="summary ratings">
                        <td class="stat-title">Mood after waking up:</td>
                        <td class="stat-value">{{ sleepDay.sleepData.mood }}</td>
                        <td class="stat-title">Quality of your sleep:</td>
                        <td class="stat-value">{{ sleepDay.sleepData.quality }}</td>
                    </tr>
                    <tr class="summary times">
                        <td class="stat-title">Went to bed at:</td>
                        <td class="stat-value">{{ convertToHourString(+sleepDay.sleepData.wentToBedAt) }}</td>
                        <td class="stat-title">Woke up at:</td>
                        <td class="stat-value">{{ convertToHourString(+sleepDay.sleepData.wokeUpAt) }}</td>
                    </tr>
                </table>
                <tr class="summary-description" *ngIf="sleepDay.sleepData.description">
                    <td class="stat-title description">Description:</td>
                    <td class="description-text">{{ sleepDay.sleepData.description }}</td>
                </tr>
            </div>

            <div *ngIf="sleepDay.message && !loading">
                <p>{{ sleepDay.message }}</p>
            </div>
        </div>

        <div *ngIf="loading">Loading...</div>
    `
})
export class DayDetailComponent {
    sleepDay$: Observable<{ sleepData: SleepData; message: string } | null> = this.sleepTrackerService.sleepDay$;
    loading = false;
    convertToHourString = SleepTrackerService.convertToHourString;

    constructor(
        private readonly sleepTrackerService: SleepTrackerService,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        private readonly toastr: ToastrService,
        public dialog: MatDialog
    ) {
        this.sleepTrackerService.loadingIndicator$.subscribe((loading: boolean) => {
            this.loading = loading;
        });
    }

    openConfirmDialog(id: string | undefined): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: { message: 'Do you wish to delete sleep data for the selected day?' }
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.deleteSleepData(id);
            }
        });
    }

    deleteSleepData(id: string | undefined): void {
        this.sleepTrackerService
            .deleteSleepData(id)
            .pipe(catchError(() => EMPTY))
            .subscribe((resp: any) => {
                this.toastr.success(resp.message);
                this.sleepTrackerService.sleepDay$.next(null);
                this.router.navigate(['../'], { relativeTo: this.activatedRoute });
            });
    }

    onNavigateToEdit(dateOfSleep: Date): void {
        const value = new Date(dateOfSleep).getTime();
        this.router.navigate([{ outlets: { st: ['form'] } }], {
            relativeTo: this.activatedRoute.parent?.parent,
            queryParams: { dateOfSleep: value }
        });
    }
}
