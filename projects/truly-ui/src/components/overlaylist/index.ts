import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputModule } from '../input/index';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { ListOptionDirective } from './directives/listoption.directive';
import { TlOverlayList } from './overlay-list';

@NgModule( {
  imports: [
    CommonModule,
    InputModule,
    OverlayModule,
    A11yModule,
    FormsModule
  ],
  declarations: [
    TlOverlayList,
    ListOptionDirective,
  ],
  exports: [
    TlOverlayList,
    ListOptionDirective,
  ],
} )
export class OverlayListModule {
}
