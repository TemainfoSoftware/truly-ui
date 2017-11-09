import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { DataTableLazyDemoComponent } from './datatablelazydemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: DataTableLazyDemoComponent },
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class DataTableLazyDemoRoutingModule {
}
