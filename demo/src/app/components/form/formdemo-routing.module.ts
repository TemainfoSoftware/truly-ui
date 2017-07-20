import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router'
import { FormDemo } from './formdemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: FormDemo }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class FormDemoRoutingModule {
}
