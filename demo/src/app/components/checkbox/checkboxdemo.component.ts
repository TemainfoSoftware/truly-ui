import { Component } from '@angular/core';
import { routerTransition } from "../../router.animations";

import * as jsonProp from './checkboxdemo-dataproperties.json';
import * as jsonEvt from './checkboxdemo-events.json';

@Component( {
  selector: 'app-checkbox',
  templateUrl: './checkboxdemo.component.html',
  animations: [ routerTransition() ],
  styleUrls: [ './checkboxdemo.component.scss' ]
} )
export class CheckBoxDemo {
  private dataTableProperties;

  private events;

  constructor() {
    this.dataTableProperties = jsonProp.dataProperties;
    this.events = jsonEvt.events;
  }

}
