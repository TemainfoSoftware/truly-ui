import { Component, ViewContainerRef } from '@angular/core';
import { routerTransition } from "../../router.animations";
import { ModalOptions } from "../../../../../src/modal/modal-options";
import { FormService } from "../../../../../src/form/form.service";
import * as json from './form-dataproperties.json';
import { CadPessoa } from "./newpessoa/cadPessoa.component";
import { DataFormService } from "./newpessoa/dataform.service";


@Component( {
  selector: 'app-modal',
  templateUrl: './formdemo.component.html',
  animations: [ routerTransition() ],
  styleUrls: [ './formdemo.component.scss' ]
} )
export class FormDemo {

  public index: number;

  public modalOptions: ModalOptions;

  private modalprop;

  private result;

  constructor(private view: ViewContainerRef, private formService: FormService, private dataFormService: DataFormService) {
    this.formService.setViewForm(view);

    this.modalprop = json.dataProperties;
    this.modalOptions = {
      title: 'New Form',
      icon: 'ion-ios-list-outline',
      draggable: true,
      width: '500px',
      height: 'auto',
      maximizable: true,
      minimizable: true,
      fullscreen: true
    };
  }


  modal1() {
    this.formService.createForm(CadPessoa, this.modalOptions, (modalResult) => {
      console.log('modalResult', modalResult);
      this.dataFormService.saveDataForm(modalResult.formResult);
      this.result = this.dataFormService.getDataForm();
    });
  }

}
