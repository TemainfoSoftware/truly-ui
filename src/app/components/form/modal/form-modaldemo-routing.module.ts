import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormModaldemoComponent } from './form-modaldemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: FormModaldemoComponent }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class FormModalDemoRoutingModule {
}
