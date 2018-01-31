import { Component, OnChanges, SimpleChanges, ViewContainerRef } from '@angular/core';

import * as jsonProp from './multiselectdemo-dataproperties.json';
import * as jsonEvt from './multiselectdemo-events.json';
import { DumpDataService } from '../../shared/services/dumpdata';
import { DialogService } from '../../../components/dialog';

@Component( {
  selector: 'app-multiselect-demo',
  templateUrl: './multiselectdemo.component.html',
  styleUrls: [ './multiselectdemo.component.scss' ],
  providers: [ DumpDataService ]
} )
export class MultiSelectDemoComponent implements OnChanges {

  public dataTableProperties;

  public events;

  public dataNoSourceBasic = [];

  public dataNoSourceBasicModel = [];

  public dataCustomColors = [];

  public dataCustomIcon = [];

  public dataCustomDetail = [];

  constructor(public view: ViewContainerRef, public dialogService: DialogService) {


    this.dataTableProperties = jsonProp.dataProperties;

    this.events = jsonEvt.events;

    this.dataNoSourceBasic =
      [
        { id: 1, firstName: 'William', lastName: 'King', email: 'contact@domain.com' },
        { id: 2, firstName: 'Maria', lastName: 'King', email: 'contact@domain.com' },
        { id: 3, firstName: 'Andrea', lastName: 'King', email: 'contact@domain.com' },
        { id: 4, firstName: 'Fred', lastName: 'King', email: 'contact@domain.com' },
        { id: 5, firstName: 'Laura', lastName: 'King', email: 'contact@domain.com' }
        ,
      ];

    this.dataNoSourceBasicModel = [
      { id: 4, firstName: 'Fred', lastName: 'King', email: 'contact@domain.com' },
      { id: 5, firstName: 'Laura', lastName: 'King', email: 'contact@domain.com' }
    ];

    this.dataCustomColors =
      [
        { source: { id: 1, firstName: 'Antonio', lastName: 'King', email: 'contact@domain.com' }, effect: {color: '#DC136C' } },
        { source: { id: 2, firstName: 'Junior', lastName: 'King', email: 'contact@domain.com' }, effect: {color: '#84B082' } },
        { source: { id: 3, firstName: 'Murilo', lastName: 'King', email: 'contact@domain.com' }, effect: {color: '#353A47' } },
        { source: { id: 4, firstName: 'Sara', lastName: 'King', email: 'contact@domain.com'}, effect: {color: '#885A5A' } },
        { source: { id: 5, firstName: 'Claudia', lastName: 'King', email: 'contact@domain.com', effect: {color: '#F7C1BB' } } }
        ,
      ];

    this.dataCustomDetail =
      [
        { source: { id: 1, firstName: 'Antonio', lastName: 'King', email: 'contact@domain.com' }},
        { source: { id: 2, firstName: 'Junior', lastName: 'King', email: 'contact@domain.com' }},
        { source: { id: 3, firstName: 'Murilo', lastName: 'King', email: 'contact@domain.com' }},
        { source: { id: 4, firstName: 'Sara', lastName: 'King', email: 'contact@domain.com'}},
        { source: { id: 5, firstName: 'Claudia', lastName: 'King', email: 'contact@domain.com'}}
        ,
      ];

    this.dataCustomIcon =
      [
        { source: { id: 1, firstName: 'Antonio', lastName: 'King', email: 'contact@domain.com' }, effect: { icon: 'ion-heart' }},
        { source: { id: 2, firstName: 'Junior', lastName: 'King', email: 'contact@domain.com'}, effect: { icon: 'ion-upload' }},
        { source: { id: 3, firstName: 'Murilo', lastName: 'King', email: 'contact@domain.com' }, effect: { icon: 'ion-ribbon-b' } },
        { source: { id: 4, firstName: 'Sara', lastName: 'King', email: 'contact@domain.com'}, effect: { icon: 'ion-ios-paper-outline' } },
        { source: { id: 5, firstName: 'Claudia', lastName: 'King', email: 'contact@domain.com' }, effect: { icon: 'ion-ios-alarm' } }
        ,
      ];
  }

  show() {
    try {
      if ( this.dataNoSourceBasicModel.length >= 1 ) {
        this.showInfo();
      } else {
        throw { name: 'DATA LENGTH ERROR', message: 'Invalid Data, needs more than ONE tag selected' };
      }
    } catch (err) {
      this.exception(err);
    }
  }


  showInfo() {
    this.dialogService.info( JSON.stringify(this.dataNoSourceBasicModel), ( modalResult ) => {
        console.log('Return', modalResult);
      }, {
        title: 'Model Value',
        textOk: 'Ok',
        draggable: true,
      }
    );
  }

  exception(error) {
    this.dialogService.error( error.message, ( modalResult ) => {
      console.log( 'Return', modalResult );
    }, {exceptionName: error.name, exceptionMessage: error.message});
  }

  onClickTag($event) {
    console.log('Clicked Tag', $event);
  }

  onRemoveTag($event) {
    console.log('Removed Tag', $event);
  }

  ngOnChanges( change: SimpleChanges ) {
    console.log( 'changes', change );
  }

}
