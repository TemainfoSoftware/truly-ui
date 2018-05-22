import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PanelDemoComponent } from './paneldemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: PanelDemoComponent }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class PanelDemoRoutingModule {
}
