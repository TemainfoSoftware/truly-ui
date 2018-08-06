import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CPFValidator } from '../../../../projects/truly-ui/src/components/validators/cpf/cpf.validator';
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
export class InputValidatorsDemoComponent implements OnInit {

  public dataTableProperties;

  public dataTableEvents;

  public uppercase = '';

  public readonly = 'I\'m an Truly Ui Input (Selectable)';

  public disabled = 'I\'m an Truly Ui Input (Not Selectable)';

  public cpf;

  public cnpj;

  public email;

  public date;

  public pattern;

  public number;

  public password;

  public form: FormGroup;

  constructor( private formBuilder: FormBuilder ) {
    this.dataTableProperties = json.dataProperties;
    this.dataTableEvents = jsonEvents.dataEvents;
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      cpf: ['', CPFValidator()]
    });
  }

}
