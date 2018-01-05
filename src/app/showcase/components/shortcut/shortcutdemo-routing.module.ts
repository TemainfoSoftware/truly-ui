import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShortcutDemoComponent } from './shortcutdemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: ShortcutDemoComponent }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class ShortcutDemoRoutingModule {
}
