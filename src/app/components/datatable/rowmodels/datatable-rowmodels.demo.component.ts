import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
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
export class DatatableRowModelsDemoComponent implements OnInit, OnDestroy {

  public dataInMemory;

  public data = this.dumpDataService.createRandomData(1000);

  public dataInfinite: any;

  public dataTableProperties;

  public dataTableEvents;

  public take = 200;

  public timeout;

  public recordsCount = 0;

  private subscriptions = new Subscription();

  constructor(private httpCliente: HttpClient, private dumpDataService: DumpDataService, private cd: ChangeDetectorRef ) {
    this.dataTableProperties = json.dataProperties;
    this.dataTableEvents = jsonEvents.dataProperties;
  }

  ngOnInit() {
    this.getDataForInifinit(0, this.take);
    this.subscriptions.add(
      this.httpCliente.get('http://trulyui.getsandbox.com/pacientes').subscribe((data: any) => {
        this.dataInMemory = data.data;
        this.cd.detectChanges();
      })
    );
  }

  onLoadData(event) {
    this.getDataForInifinit(event.skip, event.take);
  }

  onRowSelect($event) {
    console.log($event);
  }

  private getDataForInifinit(skip, take) {
    clearTimeout(this.timeout );
    this.timeout = setTimeout(() => {
      this.dataInfinite = this.getDataFromService(skip, take);
      this.recordsCount = this.data.length;
      this.cd.markForCheck();
    }, 1000);
  }

  private getDataFromService(skip, take) {
    return this.data.slice(skip, take);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
