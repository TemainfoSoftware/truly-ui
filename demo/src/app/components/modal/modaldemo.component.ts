import { Component, ViewContainerRef } from '@angular/core';
import { ModalService } from "../../../../../src/modal/modal.service";
import { routerTransition } from "../../router.animations";
import { ModalOptions } from "../../../../../src/modal/modal-options";
import { NewModal } from "./newmodal/newModal.component";

import * as json from './modal-dataproperties.json';
import * as jsonEvt from './modal-dataevents.json';


@Component( {
  selector: 'app-modal',
  templateUrl: './modaldemo.component.html',
  animations: [ routerTransition() ],
  styleUrls: [ './modaldemo.component.scss' ]
} )
export class ModalDemo {

  public index: number;
  public modals;
  public modalOptions: ModalOptions;

  private modalprop;
  private modalevts;
  private modalResult;


  constructor(private view: ViewContainerRef, private modalService: ModalService) {
    this.modalService.setView(this.view);

    this.modalevts = jsonEvt.dataEvents;
    this.modalprop = json.dataProperties;

    this.modalOptions = {
      title: 'New Modal',
      icon: 'ion-monitor',
      draggable: true,
      width: '500px',
      height: 'auto',
      maximizable: true,
      minimizable: true,
    };
  }

  modal1() {
    this.modalService.createModal(NewModal, this.modalOptions, (modalResult) => {
        this.modalResult = modalResult;
    });
  }

}
