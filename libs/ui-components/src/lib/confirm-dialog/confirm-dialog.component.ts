import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'portfolio-confirm-dialog',
    template: `
        <mat-dialog-content>
            <h3>{{ data.message }}</h3>
        </mat-dialog-content>
        <mat-dialog-actions align="end">
            <button mat-button mat-dialog-close>Cancel</button>
            <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Confirm</button>
        </mat-dialog-actions>
    `,
    styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}
}
