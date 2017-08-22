import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router'
import { CheckBoxDemo } from './checkboxdemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: CheckBoxDemo }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class CheckBoxDemoRoutingModule {
}
