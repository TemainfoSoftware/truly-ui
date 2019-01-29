import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconsModule } from '../icons/index';

import { TlAvatar } from './avatar';
import { ImageComponent } from './parts/image/image.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IconsModule
  ],
  declarations: [
    TlAvatar,
    ImageComponent
  ],
  exports: [
    TlAvatar
  ]
})
export class AvatarModule {}
