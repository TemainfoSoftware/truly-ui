import { Component, ViewContainerRef } from '@angular/core';
import { ModalService } from "../../../../../src/modal/modal.service";
import { routerTransition } from "../../router.animations";
import { ModalOptions } from "../../../../../src/modal/modal-options";
import { FormService } from "../../../../../src/form/form.service";
import * as json from './form-dataproperties.json';
import { CadPessoa } from "./newpessoa/cadPessoa.component";


@Component( {
  selector: 'app-modal',
  templateUrl: './formdemo.component.html',
  animations: [ routerTransition() ],
  styleUrls: [ './formdemo.component.scss' ]
} )
export class FormDemo {

  public index: number;
  public modals;
  public modalOptions: ModalOptions;
  private modalprop;

  constructor(private view: ViewContainerRef, private modalService: ModalService, private formService: FormService) {
    this.modalService.setView(this.view);
    this.modalprop = json.dataProperties;

    this.modalOptions = {
      title: 'New Form',
      icon: 'ion-monitor',
      draggable: true,
      width: '500px',
      height: 'auto',
      maximizable: true,
      minimizable: true
    };
  }

  modal1() {
    this.formService.createForm(CadPessoa, this.modalOptions, (modalResult) => {
      console.log('Return',modalResult);
    });
  }

}
