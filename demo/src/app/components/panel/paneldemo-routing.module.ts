import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router'
import { PanelDemo } from './paneldemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: PanelDemo }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class PanelDemoRoutingModule {
}
