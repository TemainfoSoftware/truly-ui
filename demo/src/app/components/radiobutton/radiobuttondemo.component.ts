import { Component } from '@angular/core';
import { routerTransition } from '../../router.animations';

import * as json from './radiobuttondemo-dataproperties.json';
import * as jsonEvts from './radiobuttondemo-events.json';

@Component( {
  selector: 'app-radio',
  templateUrl: './radiobuttondemo.component.html',
  animations: [ routerTransition() ],
  styleUrls: [ './radiobuttondemo.component.scss' ]
} )
export class RadioButtonDemoComponent {
  private dataTableProperties;

  private radio;

  private radio2;

  private dataEvents;

  constructor() {
    this.dataTableProperties = json.dataProperties;
    this.dataEvents = jsonEvts.dataEvents;
  }

}
