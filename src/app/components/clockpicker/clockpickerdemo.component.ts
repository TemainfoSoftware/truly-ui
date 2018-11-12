import { Component, OnInit } from '@angular/core';

import * as json from './clockpickerdemo-dataproperties.json';
import * as jsonEvents from './clockpickerdemo-dataevents.json';

@Component({
  selector: 'app-clockpickerdemo',
  templateUrl: './clockpickerdemo.component.html',
  styleUrls: ['./clockpickerdemo.component.scss']
})
export class ClockPickerdemoComponent implements OnInit {

  public dataProperties;

  public dataPropertiesEvents;

  public time = '18:10';

  public timeIcon = '18:10';

  public timeButton = '18:10';

  public timeClose = '18:10';

  constructor() {
    this.dataProperties = json.data;
    this.dataPropertiesEvents = jsonEvents.data;
  }

  ngOnInit() {
  }

}
