import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListBoxDemoComponent } from './listboxdemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: ListBoxDemoComponent }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class ListBoxDemoRoutingModule {
}
