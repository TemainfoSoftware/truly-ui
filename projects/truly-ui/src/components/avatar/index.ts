import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TlAvatar } from './avatar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    TlAvatar
  ],
  exports: [
    TlAvatar
  ]
})
export class AvatarModule {}
