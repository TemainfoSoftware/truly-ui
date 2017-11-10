import { Component } from '@angular/core';
import { slideToLeft } from '../../shared/animations/router.animations';

import * as json from './tooltipdemo-dataproperties.json';


@Component( {
  selector: 'app-tooltip',
  templateUrl: './tooltipdemo.component.html',
  animations: [ slideToLeft() ],
  styleUrls: [ './tooltipdemo.component.scss' ]
} )
export class TooltipDemoComponent {
  public tooltipProperties;

  constructor() {
    this.tooltipProperties = json.data;
  }

}
