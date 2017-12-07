import { Component } from '@angular/core';
import { Modal } from '../../../../components/modal/modal-options';
@Modal({
  title: 'New Modal',
  icon: 'ion-monitor',
  draggable: true,
  color: '#000',
  width: '500px',
  height: 'auto',
  maximizable: true,
  minimizable: true,
})
@Component( {
  selector: 'app-new-modal',
  templateUrl: './newModal.html',
  styleUrls: [ './newModal.component.scss' ]
} )
export class NewModalComponent {


}
