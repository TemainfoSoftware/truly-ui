import { Component, OnChanges, OnInit, SimpleChanges, ViewContainerRef } from '@angular/core';

import * as jsonProp from './multiselectdemo-dataproperties.json';
import * as jsonEvt from './multiselectdemo-events.json';
import { DumpDataService } from '../../shared/services/dumpdata';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component( {
  selector: 'app-multiselect-demo',
  templateUrl: './multiselectdemo.component.html',
  styleUrls: [ './multiselectdemo.component.scss' ],
  providers: [ DumpDataService ]
} )
export class MultiSelectDemoComponent implements OnInit, OnChanges {

  public dataTableProperties;

  public dataNoSourceBasic = [];

  public dataNoSourceBasicModel = [];

  public dataSourceStringArray = [];

  public model;

  public events;

  public form = new FormGroup({
    complex: new FormControl('', Validators.required),
    arrayString: new FormControl('', Validators.required)
  });

  constructor(public view: ViewContainerRef ) {

    this.dataTableProperties = jsonProp.dataProperties;
    this.events = jsonEvt.events;
    this.dataSourceStringArray = [ 'Wilhão', 'Maicão', 'Genessão', 'Marcião', 'Dilsão', 'Gersão', 'Jaissera' ];

    this.dataNoSourceBasic =
      [
        { id: 1, firstName: 'William Aguera das Merces', lastName: 'King', email: 'contact@domain.com' },
        { id: 2, firstName: 'Maria', lastName: 'King', email: 'contact@domain.com' },
        { id: 3, firstName: 'Fred', lastName: 'King', email: 'contact@domain.com' },
        { id: 4, firstName: 'Laura', lastName: 'King', email: 'contact@domain.com' },
      ];

  }

  ngOnInit() {
    this.dataNoSourceBasicModel = [
      { id: 2, firstName: 'Maria', lastName: 'King', email: 'contact@domain.com' },
      { id: 4, firstName: 'Laura', lastName: 'King', email: 'contact@domain.com' }, ];
    this.form.get('complex').patchValue(this.dataNoSourceBasicModel);
  }

  onClickTag($event) {
    // console.log('Clicked Tag', $event);
    console.log('FORM', this.form.get('complex').value);
  }

  onRemoveTag($event) {
    // console.log('Removed Tag', $event);
  }

  ngOnChanges( change: SimpleChanges ) {
    // console.log( 'changes', change );
  }

}
