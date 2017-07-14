import { Component } from '@angular/core';

import * as json from './buttongroupdemo-dataproperties.json';


@Component( {
  selector: 'app-button-group',
  templateUrl: './buttongroupdemo.component.html',
  styleUrls: [ './buttongroupdemo.component.scss' ]
} )
export class ButtonGroupDemo {

  private dataTableProperties;

  private dataTableProperties2;

  public itemSelected: any[];

  public itemSelected2: any[];

  public itemSelected3: any[];

  public itemSelected4: any[];

  constructor() {
    this.dataTableProperties = json.dataProperties;
    this.dataTableProperties2 = json.dataProperties2;
  }

  showItemSelected(event) {
    this.itemSelected = [];
    event.forEach( (item) => {
      this.itemSelected.push( ' ' + item.text );
    });
  }

  showItemSelected2(event){
    this.itemSelected2 = [];
    event.forEach( (item) => {
      this.itemSelected2.push( ' ' + item.text );
    });
  }

  showItemSelected3(event){
    this.itemSelected3 = [];
    event.forEach( (item) => {
      this.itemSelected3.push( ' ' + item.text );
    });
  }

  showItemSelected4(event){
    this.itemSelected4 = [];
    event.forEach( (item) => {
      this.itemSelected4.push( ' ' + item.text );
    });
  }

}
