import { Component, ViewContainerRef } from '@angular/core';
import { routerTransition } from "../../router.animations";
import { DialogService } from "../../../../../src/dialog/dialog.service";
import { ModalResult } from "../../../../../src/core/enums/modal-result";

import * as json from './dialog-dataproperties.json';

@Component( {
  selector: 'app-modal',
  templateUrl: './dialogdemo.component.html',
  animations: [ routerTransition() ],
  styleUrls: [ './dialogdemo.component.scss' ],
  providers: [DialogService]
} )
export class DialogDemo {

  public index: number;
  public modals;

  private dialogProp;

  constructor( private view: ViewContainerRef, private dialogService : DialogService ) {
    this.dialogService.modalService.setView(this.view);
    this.dialogProp = json.dataProperties;
  }

  info() {
    this.dialogService.info( 'This is an Info Dialog', ( modalResult ) => {
      console.log('Return',modalResult);
    }, {
      title: 'MY CUSTOM DIALOG Silvao',
      textOk: 'Maicao',
      draggable: true,
    } )
  }

  confirmation() {
    this.dialogService.confirmation( 'Deseja realmente executar essa ação ?', ( modalResult ) => {
      if (modalResult === ModalResult.MRYES) {
        alert('clicou YES')
      }
    },)
  }

  alert() {
    this.dialogService.alert( 'This is an Alert Dialog', ( modalResult ) => {
      console.log( 'Return', modalResult );
    } )
  }

  error() {
    this.dialogService.error( 'This is an Error Dialog', ( modalResult ) => {
      console.log( 'Return', modalResult );
    }, )
  }

}
