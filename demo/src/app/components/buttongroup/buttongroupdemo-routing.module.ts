import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router'
import { ButtonGroupDemo } from './buttongroupdemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: ButtonGroupDemo }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class ButtonGroupDemoRoutingModule {
}
