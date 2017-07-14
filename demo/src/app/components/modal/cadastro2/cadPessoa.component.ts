import { Component } from '@angular/core';
import { ModalService } from "../../../../../../src/modal/modal.service";
import { NewPessoa } from "../novo/newPessoa.component";

@Component( {
  selector: 'cad-pessoa',
  templateUrl: './cadPessoa.html',
  styleUrls: [ './cadPessoa.component.scss' ]
} )
export class CadPessoa {

  constructor(private modalService: ModalService) {}

  newCad() {
    this.modalService.createModal(NewPessoa, {title: 'Incluir Novo', icon: 'ion-plus', draggable: false, height: 'auto'}, (modalResult) => {
      console.log('Return',modalResult);
    });
  }

}
