import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LinkComponent } from './link/link.component';
import { InterfacesModule } from '@portfolio/interfaces';

@NgModule({
    imports: [CommonModule, InterfacesModule, RouterModule],
    declarations: [LinkComponent],
    exports: [LinkComponent],
})
export class UiComponentsModule {}
