import { Component } from '@angular/core';

import * as json from './splitbuttondemo-dataproperties.json';

@Component( {
  selector: 'app-split-button',
  templateUrl: './splitbuttondemo.component.html',
  styleUrls: [ './splitbuttondemo.component.scss' ]
} )
export class SplitButtonDemoComponent {

  public dataTableProperties;
  public dataTableProperties2;

  constructor() {
    this.dataTableProperties = json.dataProperties;
    this.dataTableProperties2 = json.dataProperties2;
  }

  callBackDemo($event) {
    console.log($event);
  }

  onButtonClick( event ) {
    console.log( event );
  }
}
