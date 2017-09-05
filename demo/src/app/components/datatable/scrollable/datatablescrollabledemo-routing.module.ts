import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router'
import { DataTableScrollableDemo } from './datatablescrollabledemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: DataTableScrollableDemo },
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class DataTableScrollableDemoRoutingModule {
}
