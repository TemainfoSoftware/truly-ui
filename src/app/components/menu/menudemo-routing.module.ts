import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuDemoComponent } from './menudemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: MenuDemoComponent }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class MenuDemoRoutingModule {
}
