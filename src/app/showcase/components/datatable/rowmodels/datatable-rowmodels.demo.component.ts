import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, ChangeDetectorRef, OnInit } from '@angular/core';
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
export class DatatableRowModelsDemoComponent implements OnInit {

  public dataInMemory;

  public data = this.dumpDataService.createRandomData(1000);

  public dataInfinite: any;

  public dataTableProperties;

  public dataTableEvents;

  public take = 200;

  public timeout;

  constructor(private httpCliente: HttpClient, private dumpDataService: DumpDataService, private cd: ChangeDetectorRef ) {
    this.dataTableProperties = json.dataProperties;
    this.dataTableEvents = jsonEvents.dataProperties;
  }

  ngOnInit() {
    this.getDataForInifinit(0, this.take);
    this.httpCliente.get('http://trulyui.getsandbox.com/pacientes').subscribe((data: any) => {
      this.dataInMemory = data.data;
      this.cd.detectChanges();
    });
  }

  onLoadData(event) {
    console.log(event);
    this.getDataForInifinit(event.skip, event.take);
  }

  private getDataForInifinit(skip, take) {
    clearTimeout(this.timeout );
    this.timeout = setTimeout(() => {
      this.dataInfinite = {
        'data' : this.getDataFromService(skip, take),
        'total' : this.data.length
      };
      this.cd.markForCheck();
    }, 1000);
  }

  private getDataFromService(skip, take) {
    return this.data.slice(skip, take);
  }
}
