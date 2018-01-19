import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InputValidatorsDemoComponent } from './inputvalidatorsdemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: InputValidatorsDemoComponent }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class InputValidatorsDemoRoutingModule {
}
