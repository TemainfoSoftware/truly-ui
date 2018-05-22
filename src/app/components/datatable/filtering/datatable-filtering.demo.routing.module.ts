import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DatatableFilteringDemoComponent } from './datatable-filtering.demo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: DatatableFilteringDemoComponent },
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class DatatableFilteringDemoRoutingModule {
}
