import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OverlayPanelDemoComponent } from './overlay-paneldemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: OverlayPanelDemoComponent }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class OverlayPanelDemoRoutingModule {
}
