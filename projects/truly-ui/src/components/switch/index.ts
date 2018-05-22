import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TlSwitch } from './switch';

@NgModule( {
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    TlSwitch
  ],
  exports: [
    TlSwitch
  ],
} )
export class SwitchModule {
}
