import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { ModalService } from '../../../../../projects/truly-ui/src/components/modal/modal.service';
import * as json from './modal-options-table';
import { FormModalComponent } from './form-modal/form-modal.component';

@Component({
  selector: 'app-form-modaldemo',
  templateUrl: './form-modaldemo.component.html',
  styleUrls: ['./form-modaldemo.component.scss']
})
export class FormModaldemoComponent implements OnInit {

  public reactive = 'HTML';

  public dataModalOptions;

  constructor( private factory: ComponentFactoryResolver, private modalService: ModalService ) { }

  ngOnInit() {
    this.dataModalOptions = json.ModalOptions;
  }

  openModalForm() {
    this.modalService.createModal(FormModalComponent, this.factory).then((result) => {
      console.log('Result', result);
    });
  }

}
