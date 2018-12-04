import { Component, ViewContainerRef, ComponentFactoryResolver, OnInit } from '@angular/core';

import * as json from './form-dataproperties.json';
import * as jsonEvents from './form-dataevent.json';

import { slideToLeft } from '../../shared/animations/router.animations';
import { FormGroup, FormControl} from '@angular/forms';
import { PasswordValidator } from '../../../../projects/truly-ui/src/components/validators/password/password.validator';

@Component( {
  selector: 'app-modal',
  templateUrl: './formdemo.component.html',
  animations: [ slideToLeft() ],
  styleUrls: [ './formdemo.component.scss' ]
} )
export class FormDemoComponent {

  public form = new FormGroup({
    user: new FormControl(''),
    password: new FormControl('', PasswordValidator({ digits: true, specials: false, uppercase: false})),
    remember: new FormControl(false)
  });

  public formprop;

  public dataEvents;

  public person;

  public formInline;

  public data;

  constructor() {
    this.formprop = json.dataProperties;
    this.dataEvents = jsonEvents.dataEvents;
  }

  onSubmitForm( $event ) {
    this.formInline = $event;
  }


}
