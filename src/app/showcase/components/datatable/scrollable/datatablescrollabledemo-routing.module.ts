import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataTableScrollableDemoComponent } from './datatablescrollabledemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: DataTableScrollableDemoComponent },
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class DataTableScrollableDemoRoutingModule {
}
