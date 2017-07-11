import { Component, ViewContainerRef } from '@angular/core';
import { ModalService } from "../../../../../src/modal/modal.service";
import { routerTransition } from "../../router.animations";
import { ModalOptions } from "../../../../../src/modal/modal-options";
import { TlDialog } from "../../../../../src/dialog/dialog";

@Component( {
  selector: 'app-modal',
  templateUrl: './dialogdemo.component.html',
  animations: [ routerTransition() ],
  styleUrls: [ './dialogdemo.component.scss' ]
} )
export class DialogDemo {

  public index: number;
  public modals;
  public modalOptions: ModalOptions;

  constructor(private viewContainerRef:ViewContainerRef, private modal: ModalService) {
    this.modal.setView(viewContainerRef);

    this.modalOptions = {
      title: 'Confirm',
      icon: 'ion-close-circled',
      color: '#F25757',
      draggable: true,
      width: 400,
      height: 200,
      maximizable: false,
      minimizable: false
    };
  }

  modal1() {
    this.modal.createModal(TlDialog, this.modalOptions, (modalResult) => {
      console.log('Return',modalResult);
    });
    this.modals = this.modal.getMinModals();
  }

  show(item, index) {
    this.modal.removeMinModals(index);
    item.instance.element.nativeElement.style.display = 'block';
  }

}
