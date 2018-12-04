import { Component } from '@angular/core';
import { Modal } from '../../../../../projects/truly-ui/src/components/modal/interfaces/modal-options';

@Modal({
  title: 'New Modal',
  icon: 'fas fa-desktop',
  draggable: true,
  width: '500px',
  height: 'auto',
  color: 'success',
  maximizable: true,
  minimizable: true,
  backdrop: false
})
@Component( {
  selector: 'app-new-modal',
  templateUrl: './newModal.html',
  styleUrls: [ './newModal.component.scss' ]
} )
export class NewModalComponent {}
