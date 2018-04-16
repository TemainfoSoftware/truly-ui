import { Component, ChangeDetectorRef } from '@angular/core';
import { DumpDataService } from '../../../shared/services/dumpdata';

import * as json from './datatable-tablemodes.demo.dataproperties.json';

@Component( {
  selector: 'app-datatable-lazy',
  templateUrl: './datatable-tablemodes.demo.component.html',
  styleUrls: [ './datatable-tablemodes.demo.component.scss' ],
  providers: [DumpDataService]
} )
export class DatatableTableModesDemoComponent {

  public dataNormal: Array<any>;

  public data = this.dumpDataService.createRandomData(5000);

  public dataTableProperties;

  public dataTableEvents;


  constructor( private dumpDataService: DumpDataService, private cd: ChangeDetectorRef ) {
    this.dataTableProperties = json.dataProperties;
    this.dataNormal = this.dumpDataService.createRandomData(20);
  }

  onSelectRow($event) {
    console.log($event);
  }

  onClickRow($event) {
    console.log($event);
  }
}
