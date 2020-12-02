import { Component, OnInit } from '@angular/core';
import * as json from './editordemo-dataproperties.json';
import * as jsonEvents from './editordemo-dataevents.json';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-editordemo',
  templateUrl: './editordemo.component.html',
  styleUrls: ['./editordemo.component.scss']
})
export class EditorDemoComponent implements OnInit {

  public dataTableProperties;

  public dataEvents;

  public config = {

    font: {
      family: { show: true, tooltipText: 'Font family' }
    }

  };

  public form: FormGroup = new FormGroup({
    editor: new FormControl('TESTE')
  });

  constructor(  ) {
    this.dataTableProperties = json.dataProperties;
    this.dataEvents = jsonEvents.dataProperties;
    setTimeout(() => {
      this.form.get('editor').patchValue( 'TESTE123',
        { onlySelf: true, emitEvent: false });
    }, 4000);
  }

  ngOnInit() {}

}
