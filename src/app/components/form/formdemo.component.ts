import { Component, ViewContainerRef, ComponentFactoryResolver, OnInit } from '@angular/core';

import * as json from './form-dataproperties.json';
import * as jsonEvents from './form-dataevent.json';

import { slideToLeft } from '../../shared/animations/router.animations';
import { UntypedFormGroup, UntypedFormControl} from '@angular/forms';
import { PasswordValidator } from '../../../../projects/truly-ui/src/components/validators/password/password.validator';

@Component( {
  selector: 'app-modal',
  templateUrl: './formdemo.component.html',
  animations: [ slideToLeft() ],
  styleUrls: [ './formdemo.component.scss' ]
} )
export class FormDemoComponent {

  public form = new UntypedFormGroup({
    user: new UntypedFormControl(''),
    password: new UntypedFormControl('', PasswordValidator({ digits: true, specials: false, uppercase: false})),
    remember: new UntypedFormControl(false)
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
