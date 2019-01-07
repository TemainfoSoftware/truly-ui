import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconsModule } from '../icons/index';

import { TlAvatar } from './avatar';
import { SvgComponent } from './parts/svg/svg.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IconsModule
  ],
  declarations: [
    TlAvatar,
    SvgComponent
  ],
  exports: [
    TlAvatar
  ]
})
export class AvatarModule {}
