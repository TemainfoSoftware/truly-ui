import { Component } from '@angular/core';

import * as json from './overlay-paneldemo-dataproperties.json';
import * as jsonEvts from './overlay-paneldemo-events.json';
import * as jsonMethods from './overlay-paneldemo-methods.json';

import { slideToLeft } from '../../shared/animations/router.animations';

@Component( {
  selector: 'app-overlay-paneldemo',
  templateUrl: './overlay-paneldemo.component.html',
  animations: [ slideToLeft()  ],
  styleUrls: [ './overlay-paneldemo.component.scss' ]
} )
export class OverlayPanelDemoComponent {
  public dataTableProperties;

  public dataEvents;

  public dataMethods;

  constructor() {
    this.dataMethods = jsonMethods.dataMethods;
    this.dataTableProperties = json.dataProperties;
    this.dataEvents = jsonEvts.dataEvents;
  }

}
