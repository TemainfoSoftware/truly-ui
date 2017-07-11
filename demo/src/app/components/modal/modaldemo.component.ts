import { Component, ViewContainerRef } from '@angular/core';
import { ModalService } from "../../../../../src/modal/modal.service";
import { routerTransition } from "../../router.animations";
import { ModalOptions } from "../../../../../src/modal/modal-options";
import { CadPessoa } from "./cadastro2/cadPessoa.component";

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

  constructor(private viewContainerRef:ViewContainerRef, private modal: ModalService) {
    this.modal.setView(viewContainerRef);

    this.modalOptions = {
      title: 'Confirm',
      icon: 'ion-close-circled',
      draggable: true,
      width: 'auto',
      height: 'auto',
      maximizable: false,
      minimizable: false
    };
  }

  modal1() {
    this.modal.createModal(CadPessoa, this.modalOptions, (modalResult) => {
      console.log('Return',modalResult);
    });
    this.modals = this.modal.getMinModals();
  }

  show(item, index) {
    this.modal.removeMinModals(index);
    item.instance.element.nativeElement.style.display = 'block';
  }

}
