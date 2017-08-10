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
  private text = '';
  private bt = '';

  constructor(private modalService: ModalService, public formDataService: DataFormService) {
  }

  ngOnInit() {
    this.data = [
      { textItem : 'Masculino', valueItem : 'M' },
      { textItem : 'Feminino', valueItem : 'F' },
      { textItem : 'Indeciso', valueItem : 'I' },
      { textItem : 'Transexual', valueItem : 'T' },
      { textItem : 'São Paulino', valueItem : 'I' },
      { textItem : 'Bixessual', valueItem : 'B' },
    ];
    this.pessoa = this.formDataService.getDataForm();
  }

}
