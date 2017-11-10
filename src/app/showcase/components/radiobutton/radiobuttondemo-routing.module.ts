import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RadioButtonDemoComponent } from './radiobuttondemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: RadioButtonDemoComponent }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class RadioButtonDemoRoutingModule {
}
