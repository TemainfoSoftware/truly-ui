import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TlThumbnail } from './thumbnail';
import { IconsModule } from '../icons/index';
import { LightboxModule } from '../lightbox/index';
import {DialogModule} from '../dialog/index';

@NgModule({
  imports: [
    CommonModule,
    IconsModule,
    FormsModule,
    LightboxModule,
    DialogModule
  ],
  declarations: [
    TlThumbnail
  ],
  exports: [
    TlThumbnail
  ]
})
export class ThumbnailModule {}
