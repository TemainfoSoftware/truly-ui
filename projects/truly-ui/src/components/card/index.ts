import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TlCard } from './card';
import { IconsModule } from '../icons/index';
import { TlCardBody } from './parts/card-body/card-body';
import { TlCardHeader } from './parts/card-header/card-header';
import { TlCardFooter } from './parts/card-footer/card-footer';

@NgModule({
  imports: [
    CommonModule,
    IconsModule,
    FormsModule
  ],
  declarations: [
    TlCard,
    TlCardBody,
    TlCardFooter,
    TlCardHeader
  ],
  exports: [
    TlCard,
    TlCardHeader,
    TlCardFooter,
    TlCardBody
  ]
})
export class CardModule {}
