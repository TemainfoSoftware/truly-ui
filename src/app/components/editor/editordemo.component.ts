import { Component, OnInit } from '@angular/core';
import * as json from './editordemo-dataproperties.json';
import * as jsonEvents from './editordemo-dataevents.json';

@Component({
  selector: 'app-editordemo',
  templateUrl: './editordemo.component.html',
  styleUrls: ['./editordemo.component.scss']
})
export class EditorDemoComponent implements OnInit {

  public dataTableProperties;

  public dataEvents;

  public config = {

    font: {
      family: { show: true, tooltipText: 'Font family' }
    }

  };

  constructor() {
    this.dataTableProperties = json.dataProperties;
    this.dataEvents = jsonEvents.dataProperties;
  }

  ngOnInit() {}

}
