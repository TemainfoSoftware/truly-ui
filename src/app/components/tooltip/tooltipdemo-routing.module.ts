import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TooltipDemoComponent } from './tooltipdemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: TooltipDemoComponent }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class TooltipDemoRoutingModule {
}
