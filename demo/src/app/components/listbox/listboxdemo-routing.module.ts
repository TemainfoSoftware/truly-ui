import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router'
import { ListBoxDemo } from './listboxdemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: ListBoxDemo }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class ListBoxDemoRoutingModule {
}
