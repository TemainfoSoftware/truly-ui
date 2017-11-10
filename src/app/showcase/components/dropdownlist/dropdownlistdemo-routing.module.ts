import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DropDownListDemoComponent } from './dropdownlistdemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: DropDownListDemoComponent }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class DropDownListDemoRoutingModule {
}
