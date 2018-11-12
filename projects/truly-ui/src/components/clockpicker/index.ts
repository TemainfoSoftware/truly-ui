import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TlClockPicker } from './clockpicker';
import { InputModule } from '../input/index';
import { FormsModule } from '@angular/forms';
import { MiscModule } from '../misc/index';

@NgModule( {
  imports: [
    CommonModule,
    InputModule,
    MiscModule,
    FormsModule
  ],
  declarations: [
    TlClockPicker,
  ],
  exports: [
    TlClockPicker,
  ],
} )
export class ClockPickerModule {
}
