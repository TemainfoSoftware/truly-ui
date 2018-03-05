import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SwitchDemoComponent } from './switchdemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: SwitchDemoComponent }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class SwitchDemoRoutingModule {
}
