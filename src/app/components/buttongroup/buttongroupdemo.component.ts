import { Component } from '@angular/core';

import * as json from './buttongroupdemo-dataproperties.json';
import * as jsonEvts from './buttongroupdemo.dataevents.json';


@Component( {
  selector: 'app-button-group',
  templateUrl: './buttongroupdemo.component.html',
  styleUrls: [ './buttongroupdemo.component.scss' ]
} )
export class ButtonGroupDemoComponent {

  public dataTableProperties;

  public dataTableProperties2;

  public dataEvents;

  public itemSelected: any[];

  constructor() {
    this.dataTableProperties = json.dataProperties;
    this.dataTableProperties2 = json.dataProperties2;
    this.dataEvents = jsonEvts.dataEvents;
  }

  showItemSelected(event) {
    console.log('itemSelected', event);
  }

}
