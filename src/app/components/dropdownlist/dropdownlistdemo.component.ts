import { Component } from '@angular/core';

import * as json from './dropdownlistdemo-dataproperties.json';
import * as jsonEvt from './dropdownlistdemo-dataevents.json';

@Component( {
  selector: 'app-dropdown-list',
  templateUrl: './dropdownlistdemo.component.html',
  styleUrls: [ './dropdownlistdemo.component.scss' ]
} )
export class DropDownListDemoComponent {

  public dataTableProperties;

  public dataTableEvents;

  public itemSelected: any;

  public itemSelected2: any;

  public itemSelected3: any;

  public itemSelected4: any;

  public itemSelected5: any;

  public itemSelected6: any;

  public itemSelected7: any;

  public itemSelected8: any;

  public itemSelected9: any;

  public data = [];

  public bigData = [];

  public groupData = [];

  public dataWithIcon = [];

  constructor() {
    this.dataTableProperties = json.dataProperties;
    this.dataTableEvents = jsonEvt.dataProperties;
    this.data = [
      { textItem: 'Wallace', value: '1' },
      { textItem: 'Wilson', value: '2' },
      { textItem: 'Wanda', value: '3' },
      { textItem: 'Wanderlei', value: '5' }
    ];
    this.bigData = [
      { textItem: 'Item 1', value: '1' },
      { textItem: 'Item 2', value: '2' },
      { textItem: 'Item 3', value: '3' },
      { textItem: 'Item 4', value: '4' },
      { textItem: 'Item 5', value: '5' },
      { textItem: 'Item 6', value: '6' },
      { textItem: 'Item 7', value: '7' },
      { textItem: 'Item 8', value: '8' },
      { textItem: 'Item 9', value: '9' },
      { textItem: 'Item 10', value: '10' },
      { textItem: 'Item 11', value: '11' },
      { textItem: 'Item 12', value: '12' },
      { textItem: 'Item 13', value: '13' },
      { textItem: 'Item 14', value: '14' },
      { textItem: 'Item 15', value: '15' },
      { textItem: 'Item 16', value: '16' }
    ];
    this.groupData = [
      { textItem: 'Aline', value: '1', gender: 'Female' },
      { textItem: 'Anne', value: '2',  gender: 'Female' },
      { textItem: 'Laura', value: '3',  gender: 'Female' },
      { textItem: 'Wilson', value: '4',  gender: 'Male' },
      { textItem: 'Wanda', value: '5',  gender: 'Female' },
      { textItem: 'Wanderlei', value: '6',  gender: 'Male' }
    ];
    this.dataWithIcon = [
      { textItem: 'Contains', value: '1', icon: 'fa fa-arrows' },
      { textItem: 'Does not Contains', value: '2', icon: 'fa fa-arrows-v' },
      { textItem: 'Ends Withs', value: '3', icon: 'fa fa-bus' },
      { textItem: 'Equals', value: '4', icon: 'fa fa-circle' },
      { textItem: 'Not Equals', value: '5', icon: 'fa fa-external-link' },
      { textItem: 'Reset', value: '6', icon: 'ion-help-buoy' }
    ];
  }

}
