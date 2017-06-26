import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router'
import { ButtonDemo } from './buttondemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: ButtonDemo }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class ButtonDemoRoutingModule {
}
