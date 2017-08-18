import { Component } from '@angular/core';
import { routerTransition } from "../../router.animations";

import * as json from './radiobuttondemo-dataproperties.json';

@Component( {
  selector: 'app-radio',
  templateUrl: './radiobuttondemo.component.html',
  animations: [ routerTransition() ],
  styleUrls: [ './radiobuttondemo.component.scss' ]
} )
export class RadioButtonDemo {
  private dataTableProperties;

  private radio;

  private radio2;

  readonly = "I'm an Truly Ui Input (Selectable)";
  disabled = "I'm an Truly Ui Input (Not Selectable)";

  constructor() {
    this.dataTableProperties = json.dataProperties;
  }

}
