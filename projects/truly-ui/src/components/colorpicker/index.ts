import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TlColorPicker } from './colorpicker';
import { InputModule } from '../input';
import { ButtonModule } from '../button';
import { OverlayModule } from '@angular/cdk/overlay';
import { TlColorPickerContent } from './parts/colorpicker-content/colorpicker-content';
import { TlColorPickerInput } from './parts/colorpicker-content/colorpicker-input/colorpicker-input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OverlayModule,
    InputModule,
    ButtonModule
  ],
  declarations: [
    TlColorPicker,
    TlColorPickerContent,
    TlColorPickerInput
  ],
  exports: [
    TlColorPicker,
    TlColorPickerContent,
    TlColorPickerInput
  ]
})
export class ColorPickerModule {}
