import { Component, ViewContainerRef } from '@angular/core';

import * as json from './dialog-dataproperties.json';
import { slideToLeft } from '../../shared/animations/router.animations';
import { DialogService } from '../../../components/dialog';
import { ModalResult } from '../../../components/core/enums/modal-result';

@Component( {
  selector: 'app-modal',
  templateUrl: './dialogdemo.component.html',
  animations: [ slideToLeft() ],
  styleUrls: [ './dialogdemo.component.scss' ],
  providers: [DialogService]
} )
export class DialogDemoComponent {

  public index: number;
  public modals;

  public dialogProp;

  constructor( public view: ViewContainerRef, public dialogService: DialogService ) {
    this.dialogService.setView(this.view);
    this.dialogProp = json.dataProperties;
  }

  info() {
    this.dialogService.info( 'This is an Info Dialog', ( modalResult ) => {
      console.log('Return', modalResult);
    }, {
      title: 'My custom dialog',
      textOk: 'Ok',
      draggable: true,
    } );
  }

  confirmation() {
    this.dialogService.confirmation( 'Are you sure ?', ( modalResult ) => {
      if (modalResult.modalResult === ModalResult.MRYES) {
        alert('clicked YES');
      }
    }, );
  }

  alert() {
    this.dialogService.alert( 'This is an Alert Dialog', ( modalResult ) => {
      console.log( 'Return', modalResult );
    } );
  }

  error() {
    this.dialogService.error( 'This is an Error Dialog', ( modalResult ) => {
      console.log( 'Return', modalResult );
    }, );
  }

}
