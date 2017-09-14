import { Component, ViewContainerRef } from '@angular/core';
import { routerTransition } from "../../router.animations";
import { ModalOptions } from "../../../../../src/modal/modal-options";
import { FormService } from "../../../../../src/form/form.service";

import * as json from './form-dataproperties.json';

import * as jsonEvents from './form-dataevents.json';

import { NewPerson } from "./newperson/newperson.component";
import { DataFormService } from "./newperson/dataform.service";


@Component( {
  selector: 'app-modal',
  templateUrl: './formdemo.component.html',
  animations: [ routerTransition() ],
  styleUrls: [ './formdemo.component.scss' ]
} )
export class FormDemo {

  public index: number;

  public formOptions1: ModalOptions;
  public formOptions2: ModalOptions;
  public formOptions3: ModalOptions;

  private formprop;

  private formevts;

  private result;

  constructor(private view: ViewContainerRef, private formService: FormService, private dataFormService: DataFormService) {
    this.formService.setViewForm(view);

    this.formprop = json.dataProperties;
    this.formevts = jsonEvents.dataEvents;

    this.formOptions1 = {
      title: 'User Register',
      icon: 'ion-person-add',
      draggable: true,
      width: '500px',
      height: '500px',
      maximizable: true,
      minimizable: true,
      fullscreen: false
    };

    this.formOptions2 = {
      title: 'Pacient Register',
      icon: 'ion-heart',
      draggable: true,
      width: '500px',
      height: '500px',
      maximizable: true,
      minimizable: true,
      fullscreen: false
    };

    this.formOptions3 = {
      title: 'Count Register',
      icon: 'ion-stats-bars',
      draggable: true,
      width: '500px',
      height: '500px',
      maximizable: true,
      minimizable: true,
      fullscreen: false
    };
  }


  form1() {
    this.formService.createForm(NewPerson, this.formOptions1, (modalResult) => {
      this.dataFormService.saveDataForm(modalResult.formResult);
      this.result = this.dataFormService.getDataForm();
    });
  }

  form2() {
    this.formService.createForm(NewPerson, this.formOptions2, (modalResult) => {
      this.dataFormService.saveDataForm(modalResult.formResult);
      this.result = this.dataFormService.getDataForm();
    });
  }

  form3() {
    this.formService.createForm(NewPerson, this.formOptions3, (modalResult) => {
      this.dataFormService.saveDataForm(modalResult.formResult);
      this.result = this.dataFormService.getDataForm();
    });
  }



}
