import { Component } from '@angular/core';

import * as json from './splitbuttondemo-dataproperties.json';


@Component( {
  selector: 'app-split-button',
  templateUrl: './splitbuttondemo.component.html',
  styleUrls: [ './splitbuttondemo.component.scss' ]
} )
export class SplitButtonDemo {

  private dataTableProperties;

  constructor() {
    this.dataTableProperties = json.dataProperties;
  }

}
