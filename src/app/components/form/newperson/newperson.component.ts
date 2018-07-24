import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Modal } from '../../../../../projects/truly-ui/src/components/modal/modal-options';
import { DataFormService } from './dataform.service';
import { DumpDataService } from '../../../shared/services/dumpdata';


@Modal({
  title: 'New Form',
  icon: 'ion-stats-bars',
  draggable: true,
  width: '500px',
  color: 'primary',
  height: 'auto',
  maximizable: true,
  minimizable: true,
  fullscreen: false,
})

@Component( {
  selector: 'app-new-person',
  templateUrl: './newperson.html',
  styleUrls: [ './newperson.component.scss' ]
} )
export class NewPersonComponent implements OnInit, OnChanges {

  @Input() input = '21122112';

  public person;

  public data;

  public dataBasic;

  public dataAuto;

  public result;

  public birthday;

  public dropdown;

  public dependente;

  constructor(public formDataService: DataFormService,  public dataDumpService: DumpDataService) {
    this.dataAuto = this.dataDumpService.createRandomData( 200 );
  }

  ngOnInit() {
    this.dropdown = [
      { textItem : 'Wallace', value : '1' },
      { textItem : 'Wilson', value : '2' },
      { textItem : 'Wanda', value : '3' },
      { textItem : 'Wanderson', value : '4' },
      { textItem : 'Wanderlei', value : '5' }
    ];
    this.data = [
      { textItem : 'Male', valueItem : 'M' },
      { textItem : 'Female', valueItem : 'F' },
    ];
    this.dataBasic =
      [
        { source: { id: 1, firstName: 'Isadora', lastName: 'Nascimento', email: 'contact@domain.com', }, effect: { icon: 'ion-gear-a'} },
        { source: { id: 1, firstName: 'Maria', lastName: 'King', email: 'contact@domain.com', }, effect: { icon: 'ion-gear-a'} },
        { source: { id: 1, firstName: 'Andrea', lastName: 'King', email: 'contact@domain.com', }, effect: { icon: 'ion-gear-a'} },
        { source: { id: 1, firstName: 'Fred', lastName: 'King', email: 'contact@domain.com', }, effect: { icon: 'ion-gear-a' } },
        { source: { id: 1, firstName: 'Laura', lastName: 'King', email: 'contact@domain.com', }, effect: { icon: 'ion-gear-a' } }
        ,
      ];

    this.person = this.formDataService.getDataForm();
  }


  ngOnChanges(data: SimpleChanges) {
    console.log(data);
  }

}
