import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TlDate } from './date';
import { DateDirective } from './directives/date.directive';
import { InputModule } from '../input/index';
import { InternalsModule } from '../internals/index';

@NgModule({
  imports: [
    CommonModule,
    InputModule,
    FormsModule,
    InternalsModule
  ],
  declarations: [
    TlDate,
    DateDirective
  ],
  exports: [
    TlDate,
    DateDirective
  ]
})
export class DateModule {}
