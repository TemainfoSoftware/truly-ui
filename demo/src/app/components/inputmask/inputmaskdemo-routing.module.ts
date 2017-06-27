import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router'
import { InputMaskDemo } from './inputmaskdemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: InputMaskDemo }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class InputMaskDemoRoutingModule {
}
