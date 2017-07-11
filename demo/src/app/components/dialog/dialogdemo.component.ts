import { Component, ViewContainerRef } from '@angular/core';
import { routerTransition } from "../../router.animations";
import { DialogService } from "../../../../../src/dialog/dialog.service";

@Component( {
  selector: 'app-modal',
  templateUrl: './dialogdemo.component.html',
  animations: [ routerTransition() ],
  styleUrls: [ './dialogdemo.component.scss' ]
} )
export class DialogDemo {

  public index: number;
  public modals;

  constructor( private viewContainerRef : ViewContainerRef, private dialogService : DialogService ) {
    this.dialogService.modalService.setView( viewContainerRef );
  }

  info() {
    this.dialogService.info( 'This is an Info Dialog', ( modalResult ) => {
      console.log('Return',modalResult);
    } )
  }

  confirmation() {
    this.dialogService.confirmation( 'This is an Confirmation Dialog', ( modalResult ) => {
      console.log( 'Return', modalResult );
    }, )
  }

  alert() {
    this.dialogService.alert( 'This is an Alert Dialog', ( modalResult ) => {
      console.log( 'Return', modalResult );
    } )
  }

  error() {
    this.dialogService.error( 'This is an Error Dialog', ( modalResult ) => {
      console.log( 'Return', modalResult );
    }, {textClose: 'Fechar'} )
  }

}
