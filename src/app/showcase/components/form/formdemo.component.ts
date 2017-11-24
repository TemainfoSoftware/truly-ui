import { Component, ViewChild, ViewContainerRef } from '@angular/core';

import * as json from './form-dataproperties.json';

import { NewPersonComponent } from './newperson/newperson.component';
import { DataFormService } from './newperson/dataform.service';
import { DumpDataService } from '../../shared/services/dumpdata';
import { slideToLeft } from '../../shared/animations/router.animations';
import { ModalOptions } from '../../../components/modal';
import { FormService } from '../../../components/form';


@Component( {
  selector: 'app-modal',
  templateUrl: './formdemo.component.html',
  animations: [ slideToLeft() ],
  styleUrls: [ './formdemo.component.scss' ]
} )
export class FormDemoComponent {

  @ViewChild( 'containerModal' ) containerModal;

  public index: number;

  public formOptions1: ModalOptions;

  public formOptions2: ModalOptions;

  public formOptions3: ModalOptions;

  public formprop;

  public result;

  public data;

  constructor(public view: ViewContainerRef, public formService: FormService,
              public dataFormService: DataFormService,  public dataDumpService: DumpDataService) {

    this.formService.setView(view);
    this.data = this.dataDumpService.createRandomData( 100 );

    this.formprop = json.dataProperties;

    this.formOptions1 = {
      title: 'User Register',
      icon: 'ion-person-add',
      draggable: true,
      width: '500px',
      height: 'auto',
      maximizable: true,
      minimizable: true,
      fullscreen: false
    };

    this.formOptions2 = {
      title: 'Pacient Register',
      icon: 'ion-heart',
      draggable: true,
      width: '500px',
      height: 'auto',
      color: '#f27a4f',
      maximizable: true,
      minimizable: true,
      fullscreen: false
    };

    this.formOptions3 = {
      title: 'Count Register',
      icon: 'ion-stats-bars',
      draggable: true,
      width: '500px',
      color: '#5bbcf2',
      height: 'auto',
      maximizable: true,
      minimizable: true,
      fullscreen: false
    };
  }


  form1() {
    this.formService.createForm(NewPersonComponent, this.formOptions1, (modalResult) => {
      this.dataFormService.saveDataForm(modalResult.formResult);
      this.result = this.dataFormService.getDataForm();
    });
  }

  form2() {
    this.formService.createForm(NewPersonComponent, this.formOptions2, (modalResult) => {
      this.dataFormService.saveDataForm(modalResult.formResult);
      this.result = this.dataFormService.getDataForm();
    });
  }

  form3() {
    this.formService.createForm(NewPersonComponent, this.formOptions3, (modalResult) => {
      this.dataFormService.saveDataForm(modalResult.formResult);
      this.result = this.dataFormService.getDataForm();
    });
  }



}
