import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DatatableTableModesDemoComponent } from './datatable-tablemodes.demo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: DatatableTableModesDemoComponent },
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class DatatableTableModesDemoRoutingModule {
}
