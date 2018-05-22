import { Component, ViewEncapsulation } from '@angular/core';
import * as json from './inputdemo-dataproperties.json';
import { slideToLeft } from '../../shared/animations/router.animations';
import * as jsonEvents from './inputdemo.dataevents.json';

@Component( {
  selector: 'app-input',
  templateUrl: './inputdemo.component.html',
  animations: [ slideToLeft() ],
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './inputdemo.component.scss' ]
} )
export class InputDemoComponent {

  public dataTableProperties;

  public dataTableEvents;

  public uppercase = '';

  public lowercase = '';

  public readonly = 'I\'m an Truly Ui Input (Selectable)';

  public disabled = 'I\'m an Truly Ui Input (Not Selectable)';

  public basic;

  public cpf;

  public cnpj;

  constructor() {
    this.dataTableProperties = json.dataProperties;
    this.dataTableEvents = jsonEvents.dataEvents;
  }

}
