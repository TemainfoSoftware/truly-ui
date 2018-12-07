import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import * as json from './modal-options-table';
import { FormModalComponent } from './form-modal/form-modal.component';
import { ModalService } from '../../../../../projects/truly-ui/src/components/modal/services/modal.service';

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
    this.modalService.createModal(FormModalComponent, this.factory);
  }

}
