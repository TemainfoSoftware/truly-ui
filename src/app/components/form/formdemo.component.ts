import { Component, ViewContainerRef, ComponentFactoryResolver, OnInit } from '@angular/core';

import * as json from './form-dataproperties.json';
import * as jsonEvents from './form-dataevent.json';

import { ActionsModal } from '../../../../projects/truly-ui/src/components/core/enums/actions-modal';
import { DumpDataService } from '../../shared/services/dumpdata';
import { slideToLeft } from '../../shared/animations/router.animations';
import { ModalService } from '../../../../projects/truly-ui/src/components/modal/modal.service';
import { NgForm, Validators, FormGroup, FormControl} from '@angular/forms';

@Component( {
  selector: 'app-modal',
  templateUrl: './formdemo.component.html',
  animations: [ slideToLeft() ],
  styleUrls: [ './formdemo.component.scss' ]
} )
export class FormDemoComponent {

  public index: number;

  public formprop;

  public dataEvents;

  public person;

  public formModal;

  public formInline;

  public data;

  constructor( public view: ViewContainerRef, public formService: ModalService, public dataDumpService: DumpDataService,
               private compiler: ComponentFactoryResolver ) {

    this.data = this.dataDumpService.createRandomData( 100 );
    this.formprop = json.dataProperties;
    this.dataEvents = jsonEvents.dataEvents;
  }

  form2( id ) {

  }

  alertFunction(result) {
    console.log('INSERT', result);
  }

  onSubmitForm( $event ) {
    this.formInline = $event;
  }


}
