import { Component } from '@angular/core';

import * as json from './navigatordemo-dataproperties.json';
import * as jsonEvts from './navigatordemo-events.json';

import { slideToLeft } from '../../shared/animations/router.animations';

@Component( {
  selector: 'app-navigator',
  templateUrl: './navigatordemo.component.html',
  animations: [ slideToLeft()  ],
  styleUrls: [ './navigatordemo.component.scss' ]
} )
export class NavigatorDemoComponent {
  public dataTableProperties;

  public dataEvents;

  constructor() {
    this.dataTableProperties = json.dataProperties;
    this.dataEvents = jsonEvts.dataEvents;
  }

  onClickNext( event ) { console.log('CLICKNEXT:', event); }

  onClickPrevious( event ) { console.log('CLICKPREVIOUS:', event); }

}
