import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router'
import { RadioButtonDemo } from './radiobuttondemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: RadioButtonDemo }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class RadioButtonDemoRoutingModule {
}
