import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormDemoComponent } from './formdemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: FormDemoComponent }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class FormDemoRoutingModule {
}
