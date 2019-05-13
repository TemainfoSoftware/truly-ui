import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-showcase-table-properties',
  templateUrl: './showcase-table-properties.component.html',
  styleUrls: ['./showcase-table-properties.component.scss'],
})
export class ShowcaseTablePropertiesComponent implements OnInit {

  @Input('data') data = [];

  @Input() hasDefault = true;

  @Input() hasOptions = true;

  public environment;

  constructor() { }

  ngOnInit() {
    this.data.sort(function (a, b) {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
    this.environment = environment;
  }

}
