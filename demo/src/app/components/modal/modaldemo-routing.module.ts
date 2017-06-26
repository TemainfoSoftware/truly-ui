import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router'
import { ModalDemo } from './modaldemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: ModalDemo }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class ModalDemoRoutingModule {
}
