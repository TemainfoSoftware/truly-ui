import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BadgeDemoComponent } from './badgedemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: BadgeDemoComponent }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class BadgeDemoRoutingModule {
}
