import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';

import { TlTextarea } from './textarea';
import { InternalsModule } from '../internals/index';
import { IconsModule } from '../icons/index';
import { ValidatorsModule } from '../validators/index';
import { TlMessageValidationComponent } from './components/messagevalidation/messagevalidation.component';

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
    TlMessageValidationComponent
  ],
  exports: [
    TlTextarea,
    TlMessageValidationComponent
  ]
})
export class TextareaModule {}
