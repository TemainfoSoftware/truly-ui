import { Component, ViewContainerRef } from '@angular/core';

import * as json from './dialog-dataproperties.json';
import * as jsonEvts from './dialogdemo.dataevents.json';

import { slideToLeft } from '../../shared/animations/router.animations';
import { DialogService } from '../../../../projects/truly-ui/src/components/dialog/dialog.service';

@Component( {
  selector: 'app-modal',
  templateUrl: './dialogdemo.component.html',
  animations: [ slideToLeft() ],
  styleUrls: [ './dialogdemo.component.scss' ],
  providers: [ DialogService ]
} )
export class DialogDemoComponent {

  public dialogProp;

  public dialogEvents;

  constructor( public view: ViewContainerRef, public dialogService: DialogService ) {

    this.dialogProp = json.dataProperties;
    this.dialogEvents = jsonEvts.dataEvents;
  }

  info() {
    this.dialogService.info( 'This is an Info Dialog' ).then( value => {
      console.log( 'Return', value );
    } );
  }

  confirmation() {
    this.dialogService.confirmation( 'Are you sure ?', ({
      isYes: ( yes ) => console.log( 'yes', yes ),
      isNo: ( no ) => console.log( 'no', no )
    }) );
  }

  alert() {
    this.dialogService.alert( 'This is an Alert Dialog' ).then( value => {
      console.log( 'Return', value );
    } );
  }

  error() {
    this.dialogService.error( 'This is an Error Dialog' ).then( value => {
      console.log( 'Return', value );
    } );
  }

}
