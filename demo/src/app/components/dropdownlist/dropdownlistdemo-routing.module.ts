import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router'
import { DropDownListDemo } from './dropdownlistdemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: DropDownListDemo }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class DropDownListDemoRoutingModule {
}
