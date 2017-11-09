import { Component } from '@angular/core';
import { routerTransition } from '../../router.animations';

import * as json from './tooltipdemo-dataproperties.json';


@Component( {
  selector: 'app-tooltip',
  templateUrl: './tooltipdemo.component.html',
  animations: [ routerTransition() ],
  styleUrls: [ './tooltipdemo.component.scss' ]
} )
export class TooltipDemoComponent {
  private tooltipProperties;

  constructor() {
    this.tooltipProperties = json.data;
  }

}
