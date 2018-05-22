import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlockUIDemoComponent } from './blockuidemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: BlockUIDemoComponent }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class BlockUIDemoRoutingModule {
}
