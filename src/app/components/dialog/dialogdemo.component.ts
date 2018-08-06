import { Component, ViewContainerRef } from '@angular/core';

import * as json from './dialog-dataproperties.json';
import { slideToLeft } from '../../shared/animations/router.animations';
import { ModalResult } from '../../../../projects/truly-ui/src/components/core/enums/modal-result';
import { DialogService } from '../../../../projects/truly-ui/src/components/dialog/dialog.service';

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

    this.dialogProp = json.dataProperties;
  }

  info() {
    this.dialogService.info( 'This is an Info Dialog', ( modalResult ) => {
      console.log('Return', modalResult);
    }, {
      title: 'My custom dialog',
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
    }, {exceptionName: '404', exceptionMessage: 'I was created using a function call!'});
  }

}
