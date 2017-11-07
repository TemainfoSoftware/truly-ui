import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router'
import { DataTableLazyDemo } from './datatablelazydemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: DataTableLazyDemo },
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class DataTableLazyDemoRoutingModule {
}
