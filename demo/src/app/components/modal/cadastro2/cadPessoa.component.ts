import { Component } from '@angular/core';

@Component( {
  selector: 'cad-pessoa',
  templateUrl: './cadPessoa.html',
  styleUrls: [ './cadPessoa.component.scss' ]
} )
export class CadPessoa {
  public myTitle = 'Cadastro de Pessoa';
  public myIcon = 'ion-home';

  constructor() {}

}
