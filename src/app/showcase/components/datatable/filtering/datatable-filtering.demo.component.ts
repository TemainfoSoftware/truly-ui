import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DumpDataService } from '../../../shared/services/dumpdata';

import * as json from './datatable-filtering.demo.dataproperties.json';
import * as jsonEvents from './datatable-filtering.demo.dataevents.json';

@Component( {
  selector: 'app-datatable-lazy',
  templateUrl: './datatable-filtering.demo.component.html',
  styleUrls: [ './datatable-filtering.demo.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DumpDataService]
} )
export class DatatableFilteringDemoComponent {

  public data: Array<any>;

  public dataTableProperties;

  public dataTableEvents;

  constructor( private dumpDataService: DumpDataService ) {
    this.dataTableProperties = json.dataProperties;
    this.dataTableEvents = jsonEvents.dataProperties;

    this.data = this.dumpDataService.createRandomData(1000);
  }
}
