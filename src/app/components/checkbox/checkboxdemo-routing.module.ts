import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CheckBoxDemoComponent } from './checkboxdemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: CheckBoxDemoComponent }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class CheckBoxDemoRoutingModule {
}
