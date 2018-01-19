import { Component, ViewEncapsulation } from '@angular/core';
import * as json from './inputvalidatorsdemo-dataproperties.json';
import { slideToLeft } from '../../shared/animations/router.animations';
import * as jsonEvents from './inputvalidatorsdemo.dataevents.json';

@Component( {
  selector: 'app-input',
  templateUrl: './inputvalidatorsdemo.component.html',
  animations: [ slideToLeft() ],
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './inputvalidatorsdemo.component.scss' ]
} )
export class InputValidatorsDemoComponent {

  public dataTableProperties;

  public dataTableEvents;

  public uppercase = '';

  public lowercase = '';

  public readonly = 'I\'m an Truly Ui Input (Selectable)';

  public disabled = 'I\'m an Truly Ui Input (Not Selectable)';

  public cpf;

  public basicDate;

  public cnpj;

  public date;

  public number;

  constructor() {
    this.dataTableProperties = json.dataProperties;
    this.dataTableEvents = jsonEvents.dataEvents;
  }

}
