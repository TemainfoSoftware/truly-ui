import { Component, OnInit } from '@angular/core';
import * as json from './editordemo-dataproperties.json';

@Component({
  selector: 'app-editordemo',
  templateUrl: './editordemo.component.html',
  styleUrls: ['./editordemo.component.scss']
})
export class EditorDemoComponent implements OnInit {

  public dataTableProperties;

  constructor() {
    this.dataTableProperties = json.dataProperties;
  }

  ngOnInit() {}

}
