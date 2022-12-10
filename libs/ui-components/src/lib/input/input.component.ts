/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, Input, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'portfolio-input',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MatInputModule],
    template: `
        <div class="form-group">
            <mat-form-field class="input-full-width">
                <mat-label>{{ label }}</mat-label>
                <input
                    [class.is-invalid]="ngControl.touched && ngControl.invalid"
                    type="{{ type }}"
                    matInput
                    class="form-control"
                    [formControl]="$any(ngControl.control)"
                    placeholder=" {{
                        label === 'Username' || label === 'Password' ? 'Enter your ' + label : 'Enter ' + label
                    }}"
                />
                <mat-error *ngIf="ngControl.control?.errors?.['required'] && ngControl.control?.touched"
                    >Please enter a {{ label }}</mat-error
                >
                <mat-error *ngIf="ngControl.control?.errors?.['minlength'] && ngControl.control?.touched"
                    >{{ label }} must have at least
                    {{ ngControl.control?.errors?.['minlength']['requiredLength'] }} characters</mat-error
                >
                <mat-error *ngIf="ngControl.control?.errors?.['maxlength'] && ngControl.control?.touched"
                    >{{ label }} can have at most
                    {{ ngControl.control?.errors?.['maxlength']['requiredLength'] }} characters</mat-error
                >
                <mat-error *ngIf="ngControl.control?.errors?.['isMatching'] && ngControl.control?.touched"
                    >Passwords do not match</mat-error
                >
                <mat-error *ngIf="ngControl.control?.errors?.['pattern']" class="invalid-feedback">{{
                    label === 'Password'
                        ? 'Password must contain at least one digit, one uppercase and one lowercase letter'
                        : 'No special characters in the username allowed'
                }}</mat-error>
            </mat-form-field>
        </div>
    `,
    styleUrls: ['./input.component.scss']
})
export class InputComponent {
    @Input() label!: string;
    @Input() type = 'text';

    constructor(@Self() public ngControl: NgControl) {
        this.ngControl.valueAccessor = this;
    }

    writeValue(obj: any): void {}
    registerOnChange(fn: any): void {}
    registerOnTouched(fn: any): void {}
}
