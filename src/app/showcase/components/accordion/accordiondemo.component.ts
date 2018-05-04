import { Component, OnInit } from '@angular/core';
import * as json from './accordiondemo-dataproperties.json';

@Component({
  selector: 'app-accordiondemo',
  templateUrl: './accordiondemo.component.html',
  styleUrls: ['./accordiondemo.component.scss']
})
export class AccordiondemoComponent implements OnInit {

  public dataTableProperties;

  constructor() {
    this.dataTableProperties = json.dataProperties;
  }

  ngOnInit() {}

}
