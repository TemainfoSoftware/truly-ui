import { Component } from '@angular/core';

import * as json from './datatabledemo-overview-dataproperties.json';

import * as jsonEvents from './datatabledemo-overview-dataevents.json';
import { DumpDataService } from '../../../shared/services/dumpdata';

@Component( {
  selector: 'app-datatable',
  templateUrl: './datatabledemo-overview.component.html',
  styleUrls: [ './datatabledemo-overview.component.scss' ],
  providers: [ DumpDataService ]
} )
export class DataTableDemoComponent {

  public data: Array<any>;

  public dataTableProperties;

  public dataTableEvents;

  constructor( private dataDummy: DumpDataService) {
    this.dataTableProperties = json.dataProperties;
    this.dataTableEvents = jsonEvents.dataProperties;

    this.data = this.dataDummy.createRandomData(100);
  }

  onSortData( event ) {
    console.log('Sort Event: ', event);
  }

  onFilterData( event ) {
    console.log('Filter Event: ', event);
  }

  onRowSelect( row ) {
    console.log('Row Select: ', row);
  }
}
