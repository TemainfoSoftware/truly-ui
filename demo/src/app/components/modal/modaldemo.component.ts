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

  public index: number;
  public modals;

  constructor(private viewContainerRef:ViewContainerRef, private modal: ModalService) {
    this.modal.setView(viewContainerRef);
  }

  modal1() {
    this.modal.createModal('MODAL 1');
    this.modals = this.modal.getMinModals();
  }

  modal2() {
    this.modal.createModal('MODAL 2');
    this.modals = this.modal.getMinModals();
  }
  modal3() {
    this.modal.createModal('MODAL 3');
    this.modals = this.modal.getMinModals();
  }
  modal4() {
    this.modal.createModal('MODAL 4');
    this.modals = this.modal.getMinModals();
  }

  show(item, index) {
    this.modal.removeMinModals(index);
    item.instance.element.nativeElement.style.display = 'block';
  }

}
