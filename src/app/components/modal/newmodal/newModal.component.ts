import { Component } from '@angular/core';
import { Modal } from '../../../../../projects/truly-ui/src/components/modal/modal-options';

@Modal({
  title: 'New Modal',
  icon: 'ion-monitor',
  draggable: true,
  width: '500px',
  height: 'auto',
  color: 'success',
  maximizable: true,
  minimizable: true
})
@Component( {
  selector: 'app-new-modal',
  templateUrl: './newModal.html',
  styleUrls: [ './newModal.component.scss' ]
} )
export class NewModalComponent {}
