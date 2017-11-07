import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router'
import { ChatListDemo } from './chatlistdemo.component';

@NgModule( {
  imports: [
    RouterModule.forChild( [
      { path: '', component: ChatListDemo }
    ] )
  ],
  exports: [
    RouterModule
  ]
} )
export class ChatListDemoRoutingModule {
}
