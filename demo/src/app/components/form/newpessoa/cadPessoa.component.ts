import { Component, OnInit } from '@angular/core';
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

  constructor(public formDataService: DataFormService) {
  }

  ngOnInit() {
    this.data = [
      { textItem : 'Male', valueItem : 'M' },
      { textItem : 'Female', valueItem : 'F' },
    ];
    this.pessoa = this.formDataService.getDataForm();
  }

}
