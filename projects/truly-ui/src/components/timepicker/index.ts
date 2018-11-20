import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TlTimepicker } from './timepicker';
import { OverlayModule } from '@angular/cdk/overlay';
import { InputModule } from '../input/index';
import { ButtonModule } from '../button/index';
import { InternalsModule } from '../internals/index';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    InputModule,
    ButtonModule,
    InternalsModule,
    FormsModule
  ],
  declarations: [
    TlTimepicker
  ],
  exports: [
    TlTimepicker
  ]
})
export class TimePickerModule {}
