import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SplitButtonDemoComponent } from './splitbuttondemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: SplitButtonDemoComponent }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class SplitButtonDemoRoutingModule {
}
