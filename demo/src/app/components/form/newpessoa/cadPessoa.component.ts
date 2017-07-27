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
  private data;

  constructor(private modalService: ModalService, public formDataService: DataFormService) {
  }

  ngOnInit() {
    this.data = [
      { textItem : 'Masculino', valueItem : 'M' },
      { textItem : 'Feminino', valueItem : 'F' },
    ];
    this.pessoa = this.formDataService.getDataForm();
  }

}
