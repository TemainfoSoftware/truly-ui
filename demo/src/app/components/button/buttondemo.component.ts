import {Component } from '@angular/core';

import * as json from './buttondemo-dataproperties.json';


@Component( {
  selector: 'app-button',
  templateUrl: './buttondemo.component.html',
  styleUrls: [ './buttondemo.component.scss' ]
} )
export class ButtonDemo {
  private dataTableProperties;

  constructor() {
    this.dataTableProperties = json.dataProperties;
  }

}
