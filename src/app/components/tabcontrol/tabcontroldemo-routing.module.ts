import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TabControlDemoComponent } from './tabcontroldemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: TabControlDemoComponent }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class TabControlDemoRoutingModule {
}
