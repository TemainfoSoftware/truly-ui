import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TlBlockUI } from './blockui';
import { TlBlockUIComponent } from './blockui.component';

export * from './blockui';

@NgModule( {
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    TlBlockUI,
    TlBlockUIComponent
  ],
  exports: [
    TlBlockUI
  ],
  entryComponents: [
    TlBlockUIComponent
  ]
} )
export class BlockUIModule {
}
