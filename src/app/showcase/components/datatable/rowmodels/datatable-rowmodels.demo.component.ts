import { ChangeDetectionStrategy, Component, ChangeDetectorRef } from '@angular/core';
import { DumpDataService } from '../../../shared/services/dumpdata';

import * as json from './datatable-rowmodels.demo.dataproperties.json';
import * as jsonEvents from './datatable-rowmodels.demo.dataevents.json';

@Component( {
  selector: 'app-datatable-lazy',
  templateUrl: './datatable-rowmodels.demo.component.html',
  styleUrls: [ './datatable-rowmodels.demo.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DumpDataService]
} )
export class DatatableRowModelsDemoComponent {

  public dataInMemory: Array<any> = this.dumpDataService.createRandomData(1000);

  public data = this.dumpDataService.createRandomData(5000);

  public dataInfinite: any;

  public dataTableProperties;

  public dataTableEvents;

  public take = 200;

  public timeout;

  constructor( private dumpDataService: DumpDataService, private cd: ChangeDetectorRef ) {
    this.dataTableProperties = json.dataProperties;
    this.dataTableEvents = jsonEvents.dataProperties;
    this.dataInfinite = {
        'data' : this.getDataFromService(0, this.take),
        'total' : this.data.length
    };
  }

  onLoadData(event) {
    clearTimeout(this.timeout );
    this.timeout = setTimeout(() => {
      this.dataInfinite = {
        'data' : this.getDataFromService(event.skip, event.take),
        'total' : this.data.length
      };
      this.cd.markForCheck();
    }, 1000);
  }

  private getDataFromService(skip, take) {
    return this.data.slice(skip, take);
  }
}
