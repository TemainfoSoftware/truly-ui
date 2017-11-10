import { Component } from '@angular/core';

import * as jsonProp from './checkboxdemo-dataproperties.json';
import * as jsonEvt from './checkboxdemo-events.json';
import { slideToLeft } from '../../shared/animations/router.animations';

@Component( {
  selector: 'app-checkbox',
  templateUrl: './checkboxdemo.component.html',
  animations: [ slideToLeft() ],
  styleUrls: [ './checkboxdemo.component.scss' ]
} )
export class CheckBoxDemoComponent {
  public dataTableProperties;

  public events;

  constructor() {
    this.dataTableProperties = jsonProp.dataProperties;
    this.events = jsonEvt.events;
  }

  onCheckItem($event) {
    alert($event);
  }

}
