import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LinkComponent } from './link/link.component';
import { InterfacesModule } from '@portfolio/interfaces';
import { TogglerComponent } from './toggler/toggler.component';

@NgModule({
    imports: [CommonModule, InterfacesModule, TogglerComponent, LinkComponent],
    declarations: [],
    exports: [TogglerComponent, LinkComponent]
})
export class UiComponentsModule {}
