import { Component } from '@angular/core';
import * as json from './inputdemo-dataproperties.json';
import { slideToLeft } from '../../shared/animations/router.animations';

@Component( {
  selector: 'app-input',
  templateUrl: './inputdemo.component.html',
  animations: [ slideToLeft() ],
  styleUrls: [ './inputdemo.component.scss' ]
} )
export class InputDemoComponent {

  public dataTableProperties;

  public uppercase = '';

  public lowercase = '';

  public readonly = 'I\'m an Truly Ui Input (Selectable)';

  public disabled = 'I\'m an Truly Ui Input (Not Selectable)';

  constructor() {
    this.dataTableProperties = json.dataProperties;
  }

}
