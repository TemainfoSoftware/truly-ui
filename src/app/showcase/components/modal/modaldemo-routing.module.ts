import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModalDemoComponent } from './modaldemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: ModalDemoComponent }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class ModalDemoRoutingModule {
}
