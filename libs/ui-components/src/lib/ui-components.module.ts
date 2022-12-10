import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LinkComponent } from './link/link.component';
import { InterfacesModule } from '@portfolio/interfaces';
import { TogglerComponent } from './toggler/toggler.component';
import { InputComponent } from './input/input.component';
import { ButtonComponent } from './button/button.component';

@NgModule({
    imports: [CommonModule, InterfacesModule, TogglerComponent, LinkComponent, InputComponent, ButtonComponent],
    declarations: [],
    exports: [TogglerComponent, LinkComponent, InputComponent, ButtonComponent]
})
export class UiComponentsModule {}
