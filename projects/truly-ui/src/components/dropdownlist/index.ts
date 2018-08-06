import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TlDropDownList } from './dropdownlist';

import { InputModule } from '../input/index';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { OverlayListModule } from '../overlaylist/index';

@NgModule( {
  imports: [
    CommonModule,
    InputModule,
    OverlayListModule,
    OverlayModule,
    A11yModule,
    FormsModule
  ],
  declarations: [
    TlDropDownList,
  ],
  exports: [
    TlDropDownList,
  ],
} )
export class DropDownListModule {
}
