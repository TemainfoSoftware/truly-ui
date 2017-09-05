import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataFormService } from "./dataform.service";

@Component( {
  selector: 'new-person',
  templateUrl: './newperson.html',
  styleUrls: [ './newperson.component.scss' ]
} )
export class NewPerson implements OnInit, OnChanges {

  private person;
  private data;
  @Input() input ='21122112';

  constructor(public formDataService: DataFormService) {}

  ngOnInit() {
    this.data = [
      { textItem : 'Male', valueItem : 'M' },
      { textItem : 'Female', valueItem : 'F' },
    ];
    this.person = this.formDataService.getDataForm();
  }


  ngOnChanges(data: SimpleChanges) {
    console.log(data);
  }


  changess() {
    console.log('add');
  }


  onCheckRadio() {
    alert('Temainfo')
  }
}
