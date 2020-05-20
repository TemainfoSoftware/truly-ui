import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TlUpload } from './upload';
import { IconsModule } from '../icons';
import { LightboxModule } from '../lightbox';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IconsModule,
    LightboxModule,
    HttpClientModule
  ],
  declarations: [
    TlUpload
  ],
  exports: [
    TlUpload
  ]
})
export class UploadModule {}
