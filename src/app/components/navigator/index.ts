import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TlNavigator } from './navigator';

export * from './navigator';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    TlNavigator,
  ],
  exports: [
    TlNavigator,
  ]
})
export class NavigatorModule {}
