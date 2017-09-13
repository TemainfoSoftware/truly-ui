import { Component } from '@angular/core';
import { routerTransition } from "../../router.animations";

import * as json from './paneldemo-dataproperties.json';
import * as jsonEvts from './paneldemo-events.json';

@Component( {
  selector: 'app-paneldemo',
  templateUrl: './paneldemo.component.html',
  animations: [ routerTransition() ],
  styleUrls: [ './paneldemo.component.scss' ]
} )
export class PanelDemo {
  private dataTableProperties;

  private dataEvents;

  constructor() {
    this.dataTableProperties = json.dataProperties;
    this.dataEvents = jsonEvts.dataEvents;
  }

}
