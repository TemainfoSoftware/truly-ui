import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, OnInit } from '@angular/core';

import * as json from './form-dataproperties.json';
import * as jsonEvents from './form-dataevent.json';

import { NewPersonComponent } from './newperson/newperson.component';
import { DataFormService } from './newperson/dataform.service';
import { DumpDataService } from '../../shared/services/dumpdata';
import { slideToLeft } from '../../shared/animations/router.animations';
import { FormService } from '../../../../projects/truly-ui/src/components/form/form.service';

@Component( {
  selector: 'app-modal',
  templateUrl: './formdemo.component.html',
  animations: [ slideToLeft() ],
  styleUrls: [ './formdemo.component.scss' ]
} )
export class FormDemoComponent implements OnInit {

  @ViewChild( 'containerModal' ) containerModal;

  public index: number;

  public formprop;

  public dataEvents;

  public person;

  public formModal;

  public formInline;

  public data;

  public identifier;

  constructor( public view: ViewContainerRef, public formDataService: DataFormService, public formService: FormService,
               public dataFormService: DataFormService, public dataDumpService: DumpDataService,
               private compiler: ComponentFactoryResolver ) {

    this.data = this.dataDumpService.createRandomData( 100 );
    this.formprop = json.dataProperties;
    this.dataEvents = jsonEvents.dataEvents;
  }

  ngOnInit() {
    this.person = this.formDataService.getDataForm();
  }

  form1(id) {
    this.formService.createForm( NewPersonComponent, this.compiler, null, ( form ) => {
      if ( form.formResult ) {
        this.dataFormService.saveDataForm( form.formResult.value );
        this.formModal = this.dataFormService.getDataForm();
      }
    }, id );
  }

  closeModalID() {
    this.formService.modalService.getModal(this.identifier).close();
  }

  onSubmitForm( $event ) {
    this.formInline = $event;
  }

}
