import { Component, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { NewModalComponent } from './newmodal/newModal.component';

import * as json from './modal-dataproperties.json';
import * as jsonEvt from './modal-dataevents.json';
import * as jsonResult from './modal-dataresults.json';

import { slideToLeft } from '../../shared/animations/router.animations';
import { ModalService } from '../../../../projects/truly-ui/src/components/modal/services/modal.service';

@Component( {
  selector: 'app-modal',
  templateUrl: './modaldemo.component.html',
  animations: [ slideToLeft()  ],
  styleUrls: [ './modaldemo.component.scss' ]
} )
export class ModalDemoComponent {

  public index: number;

  public modalprop;

  public modalevts;

  public modalResult;

  public modalResults;

  constructor(private modalService: ModalService, private compiler: ComponentFactoryResolver) {
    this.modalevts = jsonEvt.dataEvents;
    this.modalprop = json.dataProperties;
    this.modalResults = jsonResult.dataProperties;
  }

  modal1() {
    this.modalService.createModal( NewModalComponent, this.compiler )
      .then( ( modalResult ) => {
        console.log( modalResult );
      });
  }
}
