import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigatorDemoComponent } from './navigatordemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: NavigatorDemoComponent }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class NavigatorDemoRoutingModule {
}
