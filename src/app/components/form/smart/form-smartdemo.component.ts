import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { ActionsModal } from '../../../../../projects/truly-ui/src/components/core/enums/actions-modal';
import { ModalService } from '../../../../../projects/truly-ui/src/components/modal/modal.service';
import * as json from './modal-config-table';
import { SmartFormModalComponent } from './smart-modal/smart-modal.component';

@Component({
  selector: 'app-form-smartdemo',
  templateUrl: './form-smartdemo.component.html',
  styleUrls: ['./form-smartdemo.component.scss']
})
export class FormSmartdemoComponent implements OnInit {

  public reactive = 'HTML';

  public modalConfig;

  constructor(private factory: ComponentFactoryResolver, private modalService: ModalService ) { }

  ngOnInit() {
    this.modalConfig = json.ModalConfig;
  }

  openModal() {
    this.modalService.createModal( SmartFormModalComponent, {
      factory: this.factory,
      executeAction: ActionsModal.INSERT,
      identifier: 'FORM_SMART_1',
      dataForm: {
        nickname: 'willz',
        id: 'b42f0653-b0a3-4482-b2e3-3d971ddaeb3f',
        email: 'williamaguera.m@hotmail.com',
        name: 'William',
        lastName: 'Aguera',
        user: 'william',
      },
      actions: {
        insertCall: function () {
          console.log('INSERT Function executed');
        },
        updateCall: function () {
          console.log('UPDATE Function executed');
        },
        deleteCall: function () {
          console.log('VIEW Function executed');
        },
        viewCall: function () {
          console.log('VIEW Function executed');
        }
      }
    } );
  }

}
