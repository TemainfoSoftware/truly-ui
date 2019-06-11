
import { ActionsModal } from '../../core/enums/actions-modal';
import { LOCALE_I18N } from '../../i18n/i18n.service';
import { ModalFormConfig } from '../interfaces/modal-smart-form-config';

export class SmartFormConfiguration implements ModalFormConfig {

  factory;
  executeAction;
  identifier;
  dataForm?;
  unique?;
  deleteConfirmationMessage?;
  recordNotFoundMessage?;
  parentElement?;
  titleByAction?;
  isInsertAction?: Function;
  isUpdateAction?: Function;

  constructor() {
    this.factory = null;
    this.executeAction = ActionsModal.INSERT;
    this.identifier = 'MODAL_1';
    this.unique = false;
    this.dataForm = null;
    this.deleteConfirmationMessage = LOCALE_I18N.Form.deleteConfirmationMessage;
    this.recordNotFoundMessage = LOCALE_I18N.Form.recordNotFoundMessage;
    this.parentElement = null;
    this.titleByAction = true;
    this.isInsertAction = () => this.executeAction === ActionsModal.INSERT;
    this.isUpdateAction = () => this.executeAction === ActionsModal.UPDATE;
  }

}
