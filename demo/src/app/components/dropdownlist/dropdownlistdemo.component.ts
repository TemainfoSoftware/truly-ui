import { Component } from '@angular/core';

import * as json from './dropdownlistdemo-dataproperties.json';


@Component( {
  selector : 'app-dropdown-list',
  templateUrl : './dropdownlistdemo.component.html',
  styleUrls : [ './dropdownlistdemo.component.scss' ]
} )
export class DropDownListDemo {

  private dataTableProperties;

  public itemSelected: any;

  public itemSelected2: any;

  public itemSelected3: any;

  public itemSelected4: any;

  public itemSelected5: any;

  public itemSelected6: any;

  public itemSelected7: any;

  public itemSelected8: any;

  public itemSelected9: any;

  public data: any[];

  public bigData: any[];

  public dataWidthIcon: any[];

  public simpleData: any[];

  constructor() {
    this.dataTableProperties = json.dataProperties;
    this.data = [
      { textItem : 'Item 1', valueItem : '1' },
      { textItem : 'Item 2', valueItem : '2' },
      { textItem : 'Item 3', valueItem : '3' },
      { textItem : 'Item 4', valueItem : '4' },
      { textItem : 'Item 5', valueItem : '5' }
    ];
    this.bigData = [
      { textItem : 'Item 1', valueItem : '1' },
      { textItem : 'Item 2', valueItem : '2' },
      { textItem : 'Item 3', valueItem : '3' },
      { textItem : 'Item 4', valueItem : '4' },
      { textItem : 'Item 5', valueItem : '5' },
      { textItem : 'Item 6', valueItem : '6' },
      { textItem : 'Item 7', valueItem : '7' },
      { textItem : 'Item 8', valueItem : '8' },
      { textItem : 'Item 9', valueItem : '9' },
      { textItem : 'Item 10', valueItem : '10' },
      { textItem : 'Item 11', valueItem : '11' },
      { textItem : 'Item 12', valueItem : '12' },
      { textItem : 'Item 13', valueItem : '13' },
      { textItem : 'Item 14', valueItem : '14' },
      { textItem : 'Item 15', valueItem : '15' },
      { textItem : 'Item 16', valueItem : '16' }
    ];
    this.dataWidthIcon = [
      { textItem : 'Contains', valueItem : '1', icon:'fa fa-arrows' },
      { textItem : 'Does not Contains', valueItem : '2', icon:'fa fa-arrows-v' },
      { textItem : 'Ends Withs', valueItem : '3', icon:'fa fa-bus' },
      { textItem : 'Equals', valueItem : '4', icon:'fa fa-circle' },
      { textItem : 'Not Equals', valueItem : '5', icon:'fa fa-external-link' },
      { textItem : 'Reset', valueItem : '6', icon:'ion-help-buoy' }
    ];
    this.simpleData = [ 'Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5' ];
  }

}
