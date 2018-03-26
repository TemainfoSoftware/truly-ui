import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuListDemoComponent } from './menulistdemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: MenuListDemoComponent }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class MenuListDemoRoutingModule {
}
