import { Component } from '@angular/core';

import * as json from './buttongroupdemo-dataproperties.json';


@Component( {
  selector: 'app-button-group',
  templateUrl: './buttongroupdemo.component.html',
  styleUrls: [ './buttongroupdemo.component.scss' ]
} )
export class ButtonGroupDemo {

  private dataTableProperties;

  public itemSelected: any;

  public itemSelected2: any[] = [];

  constructor() {
    this.dataTableProperties = json.dataProperties;
  }

  showItemSelected(event){
    // this.itemSelected = '';
    // console.log('View');
  }
  showItemSelected2(event){
    this.itemSelected2 = [];
    event.forEach( (item) => {
      this.itemSelected2.push( item.text );
    });
  }

}
