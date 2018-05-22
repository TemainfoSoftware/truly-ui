import { Component } from '@angular/core';

import * as json from './tabcontroldemo-dataproperties.json';
import * as jsonEvts from './tabcontroldemo-events.json';
import { slideToLeft } from '../../shared/animations/router.animations';

@Component( {
  selector: 'app-tabcontroldemo',
  templateUrl: './tabcontroldemo.component.html',
  animations: [ slideToLeft()  ],
  styleUrls: [ './tabcontroldemo.component.scss' ]
} )
export class TabControlDemoComponent {
  public dataTableProperties;
  today: number = Date.now();
  public dataEvents;

  constructor() {
    this.dataTableProperties = json.dataProperties;
    this.dataEvents = jsonEvts.dataEvents;
  }

}
