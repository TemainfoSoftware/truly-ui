import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PopupMenuDemoComponent } from './popupmenudemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: PopupMenuDemoComponent }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class PopupMenuDemoRoutingModule {
}
