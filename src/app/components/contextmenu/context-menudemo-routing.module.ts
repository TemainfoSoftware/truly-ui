import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContextMenuDemoComponent } from './context-menudemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: ContextMenuDemoComponent }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class ContextMenuDemoRoutingModule {
}
