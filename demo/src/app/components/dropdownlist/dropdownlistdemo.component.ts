import { Component } from '@angular/core';

import * as json from './dropdownlistdemo-dataproperties.json';


@Component( {
  selector: 'app-button-group',
  templateUrl: './dropdownlistdemo.component.html',
  styleUrls: [ './dropdownlistdemo.component.scss' ]
} )
export class DropDownListDemo {

  private dataTableProperties;




  constructor() {
    this.dataTableProperties = json.dataProperties;
  }


}
