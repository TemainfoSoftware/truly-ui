import { Component } from '@angular/core';
import { ModalService } from "../../../../../../src/modal/modal.service";

@Component( {
  selector: 'cad-pessoa',
  templateUrl: './cadPessoa.html',
  styleUrls: [ './cadPessoa.component.scss' ]
} )
export class CadPessoa {

  constructor(private modalService: ModalService) {}



}
