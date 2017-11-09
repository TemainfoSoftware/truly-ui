import { ChangeDetectionStrategy, Component, ChangeDetectorRef } from '@angular/core';
import { DumpDataService } from '../../../shared/services/dumpdata';

import * as json from './datatablelazydemo-dataproperties.json';
import * as jsonEvents from './datatablelazydemo-dataevents.json';

@Component( {
  selector: 'app-datatable-lazy',
  templateUrl: './datatablelazydemo.component.html',
 // changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: [ './datatablelazydemo.component.scss' ],
  providers: [DumpDataService]
} )
export class DataTableLazyDemoComponent {

  public data: Array<any>;

  public dataLazy: any;

  public rowSelected: any;

  private take = 200;

  private dataTableProperties;

  private dataTableEvents;

  private timeout ;

  constructor(private dumpDataService: DumpDataService, private cd: ChangeDetectorRef) {
    this.dataTableProperties = json.dataProperties;
    this.dataTableEvents = jsonEvents.dataProperties;

    this.data = this.dumpDataService.createRandomData(1000000);

    this.dataLazy = {
      'data' : this.getDataFromService(0, this.take),
      'total' : this.data.length
    }
  }

  getDataFromService(skip, take) {

      return this.data.slice(skip, take);

  }

  onLazyLoad(event) {
    clearTimeout(this.timeout );
    this.timeout = setTimeout(() => {
      this.dataLazy = {
          'data' : this.getDataFromService(event.skip, event.take),
          'total' : this.data.length
        };
    }, 2000)
  }

  onPageChange(event) {
   // console.log(event);
  }

  onRowSelect( row ) {
    this.rowSelected = row;
  }

}
