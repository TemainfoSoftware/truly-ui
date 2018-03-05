import { Component } from '@angular/core';

import * as jsonProp from './switchdemo-dataproperties.json';
import * as jsonEvt from './switchdemo-events.json';
import { slideToLeft } from '../../shared/animations/router.animations';

@Component( {
  selector: 'app-switch',
  templateUrl: './switchdemo.component.html',
  animations: [ slideToLeft() ],
  styleUrls: [ './switchdemo.component.scss' ]
} )
export class SwitchDemoComponent {
  public dataTableProperties;

  public events;

  public basic = false;

  constructor() {
    this.dataTableProperties = jsonProp.dataProperties;
    this.events = jsonEvt.events;
  }


}
