import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { LinkComponent } from './link/link.component';
import { InterfacesModule } from '@portfolio/interfaces';
import { TogglerComponent } from './toggler/toggler.component';
import { InputComponent } from './input/input.component';
import { ButtonComponent } from './button/button.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        InterfacesModule,
        TogglerComponent,
        LinkComponent,
        InputComponent,
        ButtonComponent
    ],
    declarations: [ConfirmDialogComponent],
    exports: [TogglerComponent, LinkComponent, InputComponent, ButtonComponent, ConfirmDialogComponent]
})
export class UiComponentsModule {}
