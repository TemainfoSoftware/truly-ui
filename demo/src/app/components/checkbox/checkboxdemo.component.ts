import { Component } from '@angular/core';
import { routerTransition } from "../../router.animations";

import * as json from './checkboxdemo-dataproperties.json';

@Component( {
  selector: 'app-checkbox',
  templateUrl: './checkboxdemo.component.html',
  animations: [ routerTransition() ],
  styleUrls: [ './checkboxdemo.component.scss' ]
} )
export class CheckBoxDemo {
  private dataTableProperties;

  private check;

  private check2;

  readonly = "I'm an Truly Ui Input (Selectable)";
  disabled = "I'm an Truly Ui Input (Not Selectable)";

  constructor() {
    this.dataTableProperties = json.dataProperties;
  }

}
