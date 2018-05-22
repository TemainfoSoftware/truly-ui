import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CalendarDemoComponent } from './calendardemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: CalendarDemoComponent }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class CalendarDemoRoutingModule {
}
