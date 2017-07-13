import { Component } from '@angular/core';

import * as json from './buttongroupdemo-dataproperties.json';


@Component( {
  selector: 'app-button-group',
  templateUrl: './buttongroupdemo.component.html',
  styleUrls: [ './buttongroupdemo.component.scss' ]
} )
export class ButtonGroupDemo {

  private dataTableProperties;

  public itemSelected: any[] = [];

  public itemSelected2: any[] = [];

  public itemSelected3: any[] = [];

  constructor() {
    this.dataTableProperties = json.dataProperties;
  }

  showItemSelected(event) {
    this.itemSelected = [];
    if(event.length > 0 && (event[0].indexSelected === true)){
      this.itemSelected.push( 'text: ' + event[0].text, 'index: ' + event[0].index );
    }
  }

  showItemSelected2(event){
    this.itemSelected2 = [];
    event.forEach( (item) => {
      this.itemSelected2.push( 'text: ' + item.text, 'index: ' + item.index );
    });
  }

  showItemSelected3(event){
    this.itemSelected3 = [];
    event.forEach( (item) => {
      this.itemSelected3.push( 'text: ' + item.text, 'index: ' + item.index );
    });
  }

}
