import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DataClientService } from './dataclient.service';
import { DumpDataService } from '../../../shared/services/dumpdata';

@Component( {
  selector: 'app-new-client',
  templateUrl: './newclient.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: [ './newclient.component.scss' ],
  providers: [ DataClientService ]
} )
export class NewClientComponent implements OnInit {

  @Input() input = '21122112';

  public result;

  public person;

  public data;

  public dataCity;

  public dataBasic;

  public dataAuto;

  public dataTitles;

  public dataStatus;

  constructor( public formDataService: DataClientService, public dataDumpService: DumpDataService ) {
    this.dataAuto = this.dataDumpService.createRandomData( 200 );
  }

  ngOnInit() {
    this.data = [
      { textItem: 'Male', valueItem: 'M' },
      { textItem: 'Female', valueItem: 'F' },
    ];
    this.dataBasic =
      [
        {
          source: { id: 1, firstName: 'Isadora', lastName: 'Nascimento', email: 'contact@domain.com', },
          effect: { icon: 'ion-gear-a' }
        },
        {
          source: { id: 1, firstName: 'Maria', lastName: 'King', email: 'contact@domain.com', },
          effect: { icon: 'ion-gear-a' }
        },
        {
          source: { id: 1, firstName: 'Andrea', lastName: 'King', email: 'contact@domain.com', },
          effect: { icon: 'ion-gear-a' }
        },
        {
          source: { id: 1, firstName: 'Fred', lastName: 'King', email: 'contact@domain.com', },
          effect: { icon: 'ion-gear-a' }
        },
        {
          source: { id: 1, firstName: 'Laura', lastName: 'King', email: 'contact@domain.com', },
          effect: { icon: 'ion-gear-a' }
        }
        ,
      ];

    this.dataCity = [
      { name: 'New York', code: 151512 },
      { name: 'Brasilia', code: 154176 },
      { name: 'Paris', code: 121488 },
      { name: 'Buenos Aires', code: 11158 },
    ];

    this.dataTitles = [
      { text: 'Programmer', value: 'pgr' },
      { text: 'Analyst', value: 'anl' },
      { text: 'Lawyer', value: 'lwy' },
      { text: 'Consult', value: 'clt' },
    ];

    this.dataStatus = [
      { title: 'Online', valueItem: 'on' },
      { title: 'Offline', valueItem: 'off' },
      { title: 'Away', valueItem: 'away' },
      { title: 'Busy', valueItem: 'busy' }
    ];

    this.person = this.formDataService.getDataForm();
  }

}
