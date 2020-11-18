import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TlSkeleton } from './skeleton';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    TlSkeleton
  ],
  exports: [
    TlSkeleton
  ]
})
export class SkeletonModule {}
