import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Modal } from '../../../../../../projects/truly-ui/src/components/modal/modal-options';
import { Validators, FormGroup, FormControl } from '@angular/forms';

@Modal({
  title: 'Form Modal Example',
  icon: 'ion-stats-bars',
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

  public form = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('',  Validators.required),
    nickname: new FormControl('',  Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    user: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
  });

  constructor() {
    this.form.get('id').disable();
  }

}
