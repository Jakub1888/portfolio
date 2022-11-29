import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LinkComponent } from './link/link.component';
import { InterfacesModule } from '@portfolio/interfaces';
import { TogglerComponent } from './toggler/toggler.component';

@NgModule({
    imports: [CommonModule, InterfacesModule, RouterModule, FormsModule],
    declarations: [LinkComponent, TogglerComponent],
    exports: [LinkComponent, TogglerComponent]
})
export class UiComponentsModule {}
