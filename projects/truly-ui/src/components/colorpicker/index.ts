import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TlColorPicker } from './colorpicker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    TlColorPicker
  ],
  exports: [
    TlColorPicker
  ]
})
export class ColorPickerModule {}
