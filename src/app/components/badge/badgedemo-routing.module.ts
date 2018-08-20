import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BadgedemoComponent } from './badgedemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: BadgedemoComponent }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class BadgedemoRoutingModule {
}
