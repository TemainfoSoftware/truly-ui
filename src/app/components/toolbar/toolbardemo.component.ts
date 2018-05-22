import { Component } from '@angular/core';

import * as json from './toolbardemo-dataproperties.json';
import { slideToLeft } from '../../shared/animations/router.animations';

@Component( {
  selector: 'app-toolbardemo',
  templateUrl: './toolbardemo.component.html',
  animations: [ slideToLeft()  ],
  styleUrls: [ './toolbardemo.component.scss' ]
} )
export class ToolbarDemoComponent {
  public dataTableProperties;

  public dataEvents;


  constructor() {
    this.dataTableProperties = json.dataProperties;
  }

}
