import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TlTimeAvailablePicker } from './time-available-picker';
import { ButtonModule } from '../button/index';
import { MiscModule } from '../misc/index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    MiscModule
  ],
  declarations: [
    TlTimeAvailablePicker
  ],
  exports: [
    TlTimeAvailablePicker
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class TimeAvailablePickerModule {}
