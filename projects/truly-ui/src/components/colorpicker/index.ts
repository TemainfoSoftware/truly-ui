import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';

import { TlColorPicker } from './colorpicker';
import { InputModule } from '../input/index';
import { IconsModule } from '../icons/index';
import { TlColorPickerContent } from './parts/colorpicker-content/colorpicker-content';
import { TlColorPickerInput } from './parts/colorpicker-input/colorpicker-input';
import { ColorPickerService } from './services/colorpicker-service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OverlayModule,
    InputModule,
    IconsModule
  ],
  providers: [
    ColorPickerService
  ],
  declarations: [
    TlColorPicker,
    TlColorPickerContent,
    TlColorPickerInput
  ],
  exports: [
    TlColorPicker,
  ]
})
export class ColorPickerModule {}
