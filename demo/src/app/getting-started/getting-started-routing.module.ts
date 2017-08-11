import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router'
import { GettingStarted } from './getting-started.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: GettingStarted }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class GettingStartedRoutingModule {
}
