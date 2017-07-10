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

  constructor() {
    this.dataTableProperties = json.dataProperties;
  }

  showItemSelected(event){
    this.itemSelected = [];
    event.forEach( (item) => {
      this.itemSelected.push( item.text );
    });
  }

}
