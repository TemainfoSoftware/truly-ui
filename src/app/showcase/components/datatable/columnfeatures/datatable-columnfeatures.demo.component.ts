import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DumpDataService } from '../../../shared/services/dumpdata';

import * as json from './datatable-columnfeatures.demo.dataproperties.json';

@Component( {
  selector: 'app-datatable-lazy',
  templateUrl: './datatable-columnfeatures.demo.component.html',
  styleUrls: [ './datatable-columnfeatures.demo.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DumpDataService]
} )
export class DatatableColumnFeaturesDemoComponent {

  public data: Array<any>;

  public dataTableProperties;

  public dataTableEvents;

  constructor( private dumpDataService: DumpDataService ) {
    this.dataTableProperties = json.dataProperties;
    this.data = this.dumpDataService.createRandomData(1000);
  }
}
