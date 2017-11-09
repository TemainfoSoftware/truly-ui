import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MultiSelectDemoComponent } from './multiselectdemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: MultiSelectDemoComponent }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class MultiSelectDemoRoutingModule {
}
