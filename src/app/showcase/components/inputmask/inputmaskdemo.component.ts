import { Component } from '@angular/core';

import * as json from './inputmaskdemo-dataproperties.json';
import { slideToLeft } from '../../shared/animations/router.animations';

@Component( {
  selector: 'app-inputmask',
  templateUrl: './inputmaskdemo.component.html',
  animations: [ slideToLeft() ],
  styleUrls: [ './inputmaskdemo.component.scss' ]
} )
export class InputMaskDemoComponent {

  public basic;

  public literal;

  public textNumber;

  public sGuides;

  public maskDemoProperties;

  constructor() {
    this.maskDemoProperties = json.dataProperties;
  }

}
