import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Modal } from '../../../../../../projects/truly-ui/src/components/modal/interfaces/modal-options';
import { Validators, FormGroup, FormControl } from '@angular/forms';

@Modal({
  title: 'Form Modal Example',
  icon: 'fas fa-chart-bar',
  draggable: true,
  width: '500px',
  color: 'primary',
  height: 'auto',
  maximizable: true,
  minimizable: true,
  fullscreen: false,
  closeOnOK: true
})
@Component( {
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: [ './form-modal.component.scss' ]
} )
export class FormModalComponent {

  public roles = [
      { id: 1, description: 'Administrator'},
      { id: 2, description: 'Secretary'},
      { id: 3, description: 'Doctor'},
  ];

  public form = new FormGroup({
    name: new FormControl('',  Validators.required),
    nickname: new FormControl('',  Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    description: new FormControl('', [Validators.required, Validators.minLength(8)]),
    user: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
  });

  constructor() {
  }

  onSubmitForm($event) {
    console.log($event);
  }

}
