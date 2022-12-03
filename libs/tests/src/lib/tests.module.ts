import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ComponentsModule } from '../../../../apps/client/src/app/components.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [CommonModule, ComponentsModule, HttpClientModule]
})
export class TestsModule {}
