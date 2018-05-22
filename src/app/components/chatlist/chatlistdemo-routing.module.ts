import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChatListDemoComponent } from './chatlistdemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: ChatListDemoComponent }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class ChatListDemoRoutingModule {
}
