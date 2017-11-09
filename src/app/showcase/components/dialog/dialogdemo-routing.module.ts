import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogDemoComponent } from './dialogdemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: DialogDemoComponent }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class DialogDemoRoutingModule {
}
