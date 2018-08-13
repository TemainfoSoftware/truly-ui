import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormInlinedemoComponent } from './form-inlinedemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: FormInlinedemoComponent }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class FormInlineDemoRoutingModule {
}
