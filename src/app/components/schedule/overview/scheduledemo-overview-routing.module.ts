import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScheduleDemoOverviewComponent } from './scheduledemo-overview.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: ScheduleDemoOverviewComponent }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class ScheduleDemoOverviewRoutingModule {
}
