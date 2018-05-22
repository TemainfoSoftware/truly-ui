import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonGroupDemoComponent } from './buttongroupdemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: ButtonGroupDemoComponent }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class ButtonGroupDemoRoutingModule {
}
