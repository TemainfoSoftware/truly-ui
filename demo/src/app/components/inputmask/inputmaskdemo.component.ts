import { Component } from '@angular/core';
import { routerTransition } from "../../router.animations";

import * as json from './inputmaskdemo-dataproperties.json';

@Component( {
  selector: 'app-inputmask',
  templateUrl: './inputmaskdemo.component.html',
  animations: [ routerTransition() ],
  styleUrls: [ './inputmaskdemo.component.scss' ]
} )
export class InputMaskDemo {
  public basic;
  public literal;
  public textNumber;
  public sGuides;
  private maskDemoProperties;

  constructor() {
    this.maskDemoProperties = json.dataProperties;
  }

}
