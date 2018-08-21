import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TlMultiSelect } from './multiselect';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { OverlayListModule } from '../overlaylist/index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OverlayListModule,
    OverlayModule
  ],
  declarations: [
    TlMultiSelect,
  ],
  exports: [
    TlMultiSelect,
  ]
})
export class MultiSelectModule {}
