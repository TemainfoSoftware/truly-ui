import { Component, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ModalOptions, ModalService } from '../../../../projects/truly-ui/src/components/modal';
import { NewModalComponent } from './newmodal/newModal.component';

import * as json from './modal-dataproperties.json';
import * as jsonEvt from './modal-dataevents.json';
import { slideToLeft } from '../../shared/animations/router.animations';

@Component( {
  selector: 'app-modal',
  templateUrl: './modaldemo.component.html',
  animations: [ slideToLeft()  ],
  styleUrls: [ './modaldemo.component.scss' ]
} )
export class ModalDemoComponent {

  public index: number;
  public modalOptions: ModalOptions;

  public modalprop;
  public modalevts;
  public modalResult;


  constructor(public view: ViewContainerRef, private modalService: ModalService, private compiler: ComponentFactoryResolver) {
    this.modalevts = jsonEvt.dataEvents;
    this.modalprop = json.dataProperties;
  }

  modal1() {
    this.modalService.createModal(NewModalComponent, this.compiler, null, (modalResult) => {
        this.modalResult = modalResult;
    }).on('show', () => {
      console.log('Show Modal');
    });
  }
}
