import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-showcase-table-properties',
  templateUrl: './showcase-table-properties.component.html',
  styleUrls: ['./showcase-table-properties.component.scss'],
})
export class ShowcaseTablePropertiesComponent implements OnInit {

  @Input('data') data = [];

  constructor() { }

  ngOnInit() {
  }

}
