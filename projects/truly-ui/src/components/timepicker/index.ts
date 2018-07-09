import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TlTimePicker } from './timepicker';
import { InputModule } from '../input/index';
import { FormsModule } from '@angular/forms';
import { TimePickerService } from './services/timepicker.service';
import { MiscModule } from '../misc/index';

@NgModule( {
  imports: [
    CommonModule,
    InputModule,
    MiscModule,
    FormsModule
  ],
  declarations: [
    TlTimePicker,
  ],
  exports: [
    TlTimePicker,
  ],
} )
export class TimePickerModule {
}
