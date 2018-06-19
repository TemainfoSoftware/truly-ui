import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TlMultiView } from './multiview';
import { TlView } from './view/view';

@NgModule( {
  imports: [
    CommonModule,
  ],
  declarations: [
    TlMultiView,
    TlView
  ],
  exports: [
    TlMultiView,
    TlView
  ],
} )
export class MultiViewModule {
}
