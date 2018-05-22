import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InputMaskDemoComponent } from './inputmaskdemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: InputMaskDemoComponent }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class InputMaskDemoRoutingModule {
}
