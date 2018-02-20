import { Component } from '@angular/core';

import * as json from './overlay-paneldemo-dataproperties.json';
import * as jsonEvts from './overlay-paneldemo-events.json';
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

  constructor() {
    this.dataTableProperties = json.dataProperties;
    this.dataEvents = jsonEvts.dataEvents;
  }

}
