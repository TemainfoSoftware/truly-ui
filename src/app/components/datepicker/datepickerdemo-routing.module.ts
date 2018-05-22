import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DatePickerDemoComponent } from './datepickerdemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: DatePickerDemoComponent }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class DatePickerDemoRoutingModule {
}
