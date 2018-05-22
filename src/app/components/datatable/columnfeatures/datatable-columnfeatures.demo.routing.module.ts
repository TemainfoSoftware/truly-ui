import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DatatableColumnFeaturesDemoComponent } from './datatable-columnfeatures.demo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: DatatableColumnFeaturesDemoComponent },
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class DatatableColumnFeaturesDemoRoutingModule {
}
