import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router'
import { InputDemo } from './inputdemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: InputDemo }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class InputDemoRoutingModule {
}
