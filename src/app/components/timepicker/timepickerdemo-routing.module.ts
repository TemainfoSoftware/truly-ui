import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TimePickerdemoComponent } from './timepickerdemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: TimePickerdemoComponent }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class TimePickerDemoRoutingModule {
}
