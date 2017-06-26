import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router'
import { TooltipDemo } from './tooltipdemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: TooltipDemo }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class TooltipDemoRoutingModule {
}
