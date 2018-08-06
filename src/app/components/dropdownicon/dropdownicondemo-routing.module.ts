import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DropDownIconDemoComponent } from './dropdownicondemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: DropDownIconDemoComponent }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class DropDownIconDemoRoutingModule {
}
