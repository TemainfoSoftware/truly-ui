import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DatatableRowModelsDemoComponent } from './datatable-rowmodels.demo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: DatatableRowModelsDemoComponent },
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class DatatableRowModelsDemoRoutingModule {
}
