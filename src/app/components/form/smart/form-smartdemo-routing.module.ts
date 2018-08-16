import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormSmartdemoComponent } from './form-smartdemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: FormSmartdemoComponent }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class FormSmartDemoRoutingModule {
}
