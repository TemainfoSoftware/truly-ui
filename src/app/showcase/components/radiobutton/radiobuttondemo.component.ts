import { Component } from '@angular/core';

import * as json from './radiobuttondemo-dataproperties.json';
import * as jsonEvts from './radiobuttondemo-events.json';
import { slideToLeft } from '../../shared/animations/router.animations';

@Component( {
  selector: 'app-radio',
  templateUrl: './radiobuttondemo.component.html',
  animations: [ slideToLeft()  ],
  styleUrls: [ './radiobuttondemo.component.scss' ]
} )
export class RadioButtonDemoComponent {
  public dataTableProperties;

  public dataTablePropertiesRadioButton;

  public radio;

  public radio2;

  public dataEvents;

  constructor() {
    this.dataTableProperties = json.dataProperties;
    this.dataTablePropertiesRadioButton = json.dataPropertiesRadioButton;
    this.dataEvents = jsonEvts.dataEvents;
  }

}
