import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToolbarDemoComponent } from './toolbardemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: ToolbarDemoComponent }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class ToolbarDemoRoutingModule {
}
