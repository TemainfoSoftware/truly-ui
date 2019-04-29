import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';

import { TlTextarea } from './textarea';
import { InternalsModule } from '../internals/index';
import { IconsModule } from '../icons/index';
import { ValidatorsModule } from '../validators/index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IconsModule,
    InternalsModule,
    ValidatorsModule,
    OverlayModule
  ],
  declarations: [
    TlTextarea,
  ],
  exports: [
    TlTextarea,
  ]
})
export class TextareaModule {}
