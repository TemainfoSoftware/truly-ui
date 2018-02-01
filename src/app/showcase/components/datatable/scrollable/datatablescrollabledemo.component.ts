import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DumpDataService } from '../../../shared/services/dumpdata';

import * as json from './datatablescrollabledemo-dataproperties.json';
import * as jsonEvents from './datatablescrollabledemo-dataevents.json';

@Component( {
  selector: 'app-datatable-lazy',
  templateUrl: './datatablescrollabledemo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: [ './datatablescrollabledemo.component.scss' ],
  providers: [DumpDataService]
} )
export class DataTableScrollableDemoComponent {

  public data: Array<any>;

  public dataLazy: any;

  public rowSelected: any;

  public take = 200;

  public dataTableProperties;

  public dataTableEvents;

  public timeout ;

  constructor(public dumpDataService: DumpDataService) {
    this.dataTableProperties = json.dataProperties;
    this.dataTableEvents = jsonEvents.dataProperties;

    this.data = this.dumpDataService.createRandomData(1000000);

    this.dataLazy = {
      'data' : this.getDataFromService(0, this.take),
      'total' : this.data.length
    };
  }

  getDataFromService(skip, take) {

      return this.data.slice(skip, take);

  }

  onLoadData(event) {
    clearTimeout(this.timeout );
    this.timeout = setTimeout(() => {
      this.dataLazy = {
          'data' : this.getDataFromService(event.skip, event.take),
          'total' : this.data.length
        };
    }, 2000);
  }

  onRowSelect( row ) {
    this.rowSelected = row;
  }

}
