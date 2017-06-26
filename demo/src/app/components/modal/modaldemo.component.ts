import { Component, ViewContainerRef } from '@angular/core';
import { ModalService } from "../../../../../src/modal/modal.service";
import { routerTransition } from "../../router.animations";

@Component( {
  selector: 'app-modal',
  templateUrl: './modaldemo.component.html',
  animations: [ routerTransition() ],
  styleUrls: [ './modaldemo.component.scss' ]
} )
export class ModalDemo {

  constructor(private viewContainerRef:ViewContainerRef, private modal: ModalService) {
    this.modal.setView(viewContainerRef);
  }

  showModal() {
    this.modal.createModal();
  }

}
