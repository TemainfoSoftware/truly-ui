import { Component } from '@angular/core';

import * as json from './paneldemo-dataproperties.json';
import * as jsonEvts from './paneldemo-events.json';
import { slideToLeft } from '../../shared/animations/router.animations';

@Component( {
  selector: 'app-paneldemo',
  templateUrl: './paneldemo.component.html',
  animations: [ slideToLeft()  ],
  styleUrls: [ './paneldemo.component.scss' ]
} )
export class PanelDemoComponent {
  public dataTableProperties;

  public dataEvents;

  constructor() {
    this.dataTableProperties = json.dataProperties;
    this.dataEvents = jsonEvts.dataEvents;
  }

}
