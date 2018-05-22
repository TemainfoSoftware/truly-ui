import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToasterDemoComponent } from './toasterdemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: ToasterDemoComponent }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class ToasterDemoRoutingModule {
}
