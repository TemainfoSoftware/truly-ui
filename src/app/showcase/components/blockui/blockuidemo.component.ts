import { Component } from '@angular/core';

import * as json from './blockuidemo-dataproperties.json';
import * as jsonEvts from './blockuidemo-events.json';

import { slideToLeft } from '../../shared/animations/router.animations';

@Component( {
  selector: 'app-blockui-demo',
  templateUrl: './blockuidemo.component.html',
  animations: [ slideToLeft()  ],
  styleUrls: [ './blockuidemo.component.scss' ]
} )
export class BlockUIDemoComponent {
  public dataTableProperties;

  public dataEvents;

  public basic = true;

  public message = true;

  public spinOff = true;

  public spinOffMessage = true;

  constructor() {
    this.dataTableProperties = json.dataProperties;
    this.dataEvents = jsonEvts.dataEvents;
  }

  toggleBasic() {
    this.basic = !this.basic;
  }

  toggleMessage() {
    this.message = !this.message;
  }

  toggleSpinOff() {
    this.spinOff = !this.spinOff;
  }

  toggleSpinOffMessage() {
    this.spinOffMessage = !this.spinOffMessage;
  }

}
