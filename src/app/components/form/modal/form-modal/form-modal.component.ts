import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Modal } from '../../../../../../projects/truly-ui/src/components/modal/interfaces/modal-options';
import { Validators, UntypedFormGroup, UntypedFormControl } from '@angular/forms';

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

  public form = new UntypedFormGroup({
    name: new UntypedFormControl('',  Validators.required),
    nickname: new UntypedFormControl('',  Validators.required),
    email: new UntypedFormControl('', [Validators.email, Validators.required]),
    description: new UntypedFormControl('', [Validators.required, Validators.minLength(8)]),
    user: new UntypedFormControl('', Validators.required),
    role: new UntypedFormControl('', Validators.required),
    password: new UntypedFormControl('', [
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
