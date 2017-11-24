import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../../../environments/environment';


@Component({
  selector: 'app-showcase-table-properties',
  templateUrl: './showcase-table-properties.component.html',
  styleUrls: ['./showcase-table-properties.component.scss'],
})
export class ShowcaseTablePropertiesComponent implements OnInit {

  @Input('data') data = [];

  public environment;

  constructor() { }

  ngOnInit() {
    this.environment = environment;
  }

}
