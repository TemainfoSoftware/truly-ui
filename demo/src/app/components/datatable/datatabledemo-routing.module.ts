import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router'
import { DataTableDemo } from './datatabledemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: DataTableDemo },
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class DataTableDemoRoutingModule {
}
