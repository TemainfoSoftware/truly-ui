import { Component } from '@angular/core';

import * as json from './dropdownicondemo-dataproperties.json';

@Component( {
  selector : 'app-dropdown-icon',
  templateUrl : './dropdownicondemo.component.html',
  styleUrls : [ './dropdownicondemo.component.scss' ]
} )
export class DropDownIconDemoComponent {

  public dataTableProperties;

  public data;

  public itemSelected;

  public itemSelected2;

  constructor() {
    this.dataTableProperties = json.dataProperties;
    this.data = [
      { textItem : 'Wallace', value : '1', icon: 'ion ion-ios-trending-down' },
      { textItem : 'Wilson', value : '2', icon: 'ion ion-ios-expand' },
      { textItem : 'Wanda', value : '3', icon: 'ion ion-ios-move' },
      { textItem : 'Wanderson', value : '4', icon: 'ion ion-ios-resize' },
      { textItem : 'Wanderlei', value : '5', icon: 'ion ion-ios-swap' }
    ];
  }

}
