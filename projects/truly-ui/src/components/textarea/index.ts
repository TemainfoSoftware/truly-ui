import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TlTextarea } from './textarea';
import { InternalsModule } from '../internals/index';
import { IconsModule } from '../icons/index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IconsModule,
    InternalsModule
  ],
  declarations: [
    TlTextarea
  ],
  exports: [
    TlTextarea
  ]
})
export class TextareaModule {}
