import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TlUpload } from './upload';
import {IconsModule} from '../icons';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IconsModule
  ],
  declarations: [
    TlUpload
  ],
  exports: [
    TlUpload
  ]
})
export class UploadModule {}
