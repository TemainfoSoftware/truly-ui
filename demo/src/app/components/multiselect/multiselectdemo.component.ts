import { Component } from '@angular/core';

import * as jsonProp from './multiselectdemo-dataproperties.json';
import * as jsonEvt from './multiselectdemo-events.json';
import { DumpDataService } from "../../shared/services/dumpdata";

@Component( {
  selector: 'app-multiselect-demo',
  templateUrl: './multiselectdemo.component.html',
  styleUrls: [ './multiselectdemo.component.scss' ],
  providers: [ DumpDataService ]
} )
export class MultiSelectDemo {

  private dataTableProperties;
  private events;
  private dataBasic = [];
  private dataBasicModel;

  constructor() {
    this.dataTableProperties = jsonProp.dataProperties;
    this.events = jsonEvt.events;

    this.dataBasic =
      [
        { source: { id: 1, firstName: 'William', lastName: 'King', email: 'contact@domain.com', }, effect: { icon: 'ion-gear-a', color: '#dd6c6c' } },
        { source: { id: 1, firstName: 'Maria', lastName: 'King', email: 'contact@domain.com', }, effect: { icon: 'ion-gear-a', color: '#dd6c6c' } },
        { source: { id: 1, firstName: 'Andrea', lastName: 'King', email: 'contact@domain.com', }, effect: { icon: 'ion-gear-a', color: '#dd6c6c' } },
        { source: { id: 1, firstName: 'Fred', lastName: 'King', email: 'contact@domain.com', }, effect: { icon: 'ion-gear-a', color: '#dd6c6c' } },
        { source: { id: 1, firstName: 'Laura', lastName: 'King', email: 'contact@domain.com', }, effect: { icon: 'ion-gear-a', color: '#dd6c6c' } }
        ,
      ];

    this.dataBasicModel = [{ source: { id: 1, firstName: 'Fred', lastName: 'King', email: 'contact@domain.com', }, effect: { icon: 'ion-gear-a', color: '#dd6c6c' } },
      { source: { id: 1, firstName: 'Laura', lastName: 'King', email: 'contact@domain.com', }, effect: { icon: 'ion-gear-a', color: '#dd6c6c' } }]

  }

  show() {
    alert(JSON.stringify(this.dataBasicModel));
  }


  getSelecteds($event) {
    /*console.log('New Tags', $event);*/
  }

  onClickTag($event) {
    console.log('Clicked Tag', $event);
  }

  onRemoveTag($event) {
    console.log('Removed Tag', $event);
  }

}
