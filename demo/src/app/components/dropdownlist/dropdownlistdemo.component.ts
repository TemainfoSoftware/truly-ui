import { Component } from '@angular/core';

import * as json from './dropdownlistdemo-dataproperties.json';


@Component( {
  selector : 'app-button-group',
  templateUrl : './dropdownlistdemo.component.html',
  styleUrls : [ './dropdownlistdemo.component.scss' ]
} )
export class DropDownListDemo {

  private dataTableProperties;

  public itemSelected: any[];

  public itemSelected2: any[];

  public data: any[];

  constructor() {
    this.dataTableProperties = json.dataProperties;
    this.data = [
      {
        textItem : 'Item 1',
        valueItem : '1'
      },
      {
        textItem : 'Item 2',
        valueItem : '2'
      },
      {
        textItem : 'Item 3',
        valueItem : '3'
      },
      {
        textItem : 'Item 4',
        valueItem : '4'
      }
      ,
      {
        textItem : 'Item 5',
        valueItem : '5'
      }
      ,
      {
        textItem : 'Item 6',
        valueItem : '6'
      }
    ];
  }

  showItemSelected( event ) {
    this.itemSelected = [];
    this.itemSelected.push( ' ' + event.textItem );
  }

  showItemSelected2( event ) {
    this.itemSelected2 = [];
    this.itemSelected2.push( ' ' + event.textItem );
  }



}
