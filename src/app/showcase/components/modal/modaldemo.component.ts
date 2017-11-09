import { Component, ViewContainerRef } from '@angular/core';
import { NewModalComponent } from './newmodal/newModal.component';

import * as json from './modal-dataproperties.json';
import * as jsonEvt from './modal-dataevents.json';
import { slideToLeft } from '../../shared/animations/router.animations';
import { ModalOptions, ModalService } from '../../../components/modal';


@Component( {
  selector: 'app-modal',
  templateUrl: './modaldemo.component.html',
  animations: [ slideToLeft()  ],
  styleUrls: [ './modaldemo.component.scss' ]
} )
export class ModalDemoComponent {

  public index: number;
  public modals;
  public modalOptions: ModalOptions;

  public modalprop;
  public modalevts;
  public modalResult;


  constructor(public view: ViewContainerRef, public modalService: ModalService) {
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
    this.modalService.createModal(NewModalComponent, this.modalOptions, (modalResult) => {
        this.modalResult = modalResult;
    });
  }

}
