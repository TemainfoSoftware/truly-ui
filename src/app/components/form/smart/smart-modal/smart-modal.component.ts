import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Modal } from '../../../../../../projects/truly-ui/src/components/modal/interfaces/modal-options';
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
  closeOnOK: false
})
@Component( {
  selector: 'app-smart-form',
  templateUrl: './smart-modal.component.html',
  styleUrls: [ './smart-modal.component.scss' ]
} )
export class SmartFormModalComponent {

  public form = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('',  Validators.required),
  });

  constructor() {
    this.form.get('id').disable();
  }

}
