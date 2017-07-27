import { Component, OnInit } from '@angular/core';
import { ModalService } from "../../../../../../src/modal/modal.service";
import { DataFormService } from "./dataform.service";

@Component( {
  selector: 'cad-pessoa',
  templateUrl: './cadPessoa.html',
  styleUrls: [ './cadPessoa.component.scss' ]
} )
export class CadPessoa implements OnInit {


  private pessoa;

  constructor(private modalService: ModalService, public formDataService: DataFormService) {
  }

  ngOnInit() {
    this.pessoa = this.formDataService.getDataForm();
  }

}
