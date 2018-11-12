import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClockPickerdemoComponent } from './clockpickerdemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: ClockPickerdemoComponent }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class ClockPickerDemoRoutingModule {
}
