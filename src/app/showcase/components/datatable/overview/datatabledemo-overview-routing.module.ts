import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataTableDemoComponent } from './datatabledemo-overview.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: DataTableDemoComponent },
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class DatatabledemoOverviewRoutingModule {
}
