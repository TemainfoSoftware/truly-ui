import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {  } from ''

import { TlIcons } from './icons';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    TlIcons
  ],
  exports: [
    TlIcons
  ]
})
export class IconsModule {}
