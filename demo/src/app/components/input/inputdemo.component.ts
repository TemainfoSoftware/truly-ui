import { Component } from '@angular/core';
import { routerTransition } from "../../router.animations";

import * as json from './inputdemo-dataproperties.json';

@Component( {
  selector: 'app-input',
  templateUrl: './inputdemo.component.html',
  animations: [ routerTransition() ],
  styleUrls: [ './inputdemo.component.scss' ]
} )
export class InputDemo {
  private dataTableProperties;
  uppercase = '';
  lowercase = '';
  readonly = "I'm an Truly Ui Input (Selectable)";
  disabled = "I'm an Truly Ui Input (Not Selectable)";

  constructor() {
    this.dataTableProperties = json.dataProperties;
  }

}
