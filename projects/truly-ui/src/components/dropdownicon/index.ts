import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiscModule } from '../misc/index';
import { OverlayModule } from '@angular/cdk/overlay';
import { OverlayListModule } from '../overlaylist/index';
import { TlDropdownIcon } from './dropdownicon';
import { FormsModule } from '@angular/forms';

@NgModule( {
  imports: [
    CommonModule,
    MiscModule,
    OverlayListModule,
    OverlayModule,
    FormsModule
  ],
  declarations: [
    TlDropdownIcon,
  ],
  exports: [
    TlDropdownIcon,
  ]
} )
export class DropDownIconModule {
}
