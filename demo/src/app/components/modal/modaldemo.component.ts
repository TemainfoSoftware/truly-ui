import { Component, ViewContainerRef } from '@angular/core';
import { ModalService } from "../../../../../src/modal/modal.service";
import { routerTransition } from "../../router.animations";
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

  constructor(private viewContainerRef:ViewContainerRef, private modal: ModalService) {
    this.modal.setView(viewContainerRef);

  }

  modal1() {
    this.modal.createModal(CadPessoa, 'Cadastro de Usuarios', 'ion-person-add', (modalResult) => {
      console.log('Return',modalResult);
    });
    this.modals = this.modal.getMinModals();
  }

  show(item, index) {
    this.modal.removeMinModals(index);
    item.instance.element.nativeElement.style.display = 'block';
  }

}
