import { Component, OnInit } from '@angular/core';

import * as json from './timepickerdemo-dataproperties.json';
import * as jsonEvents from './timepickerdemo-dataevents.json';

@Component({
  selector: 'app-timepickerdemo',
  templateUrl: './timepickerdemo.component.html',
  styleUrls: ['./timepickerdemo.component.scss']
})
export class TimePickerdemoComponent implements OnInit {

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
