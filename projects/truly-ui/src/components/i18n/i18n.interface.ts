import {ButtonI18nInterface} from './languages/button/index';
import {CalendarI18nInterface} from './languages/calendar/index';
import {DatatableI18nInterface} from './languages/datatable/index';
import {DialogI18nInterface} from './languages/dialog/index';
import {FormI18nInterface} from './languages/form/index';
import {ListboxI18nInterface} from './languages/listbox/index';
import {NavigatorI18nInterface} from './languages/navigator/index';
import {ValidatorsI18nInterface} from './languages/validators/index';
import {OverlayI18nInterface} from './languages/overlaylist/index';
import {EditorI18nInterface} from './languages/editor/index';
import {PermissionsI18nInterface} from './languages/permissions/index';
import {TimePickerI18nInterface} from './languages/timepicker/index';
import {AutoCompleteI18nInterface} from './languages/autocomplete/index';
import {TimeAvailablePickerI18nInterface} from './languages/time-available-picker/index';
import {ChatListI18nInterface} from './languages/chatlist/index';
import {ModalI18nInterface} from './languages/modal/index';

export interface I18nInterface {
  locale: string;
  Button: ButtonI18nInterface;
  Calendar: CalendarI18nInterface;
  ChatList: ChatListI18nInterface;
  OverlayList: OverlayI18nInterface;
  Datatable: DatatableI18nInterface;
  Dialog: DialogI18nInterface;
  Editor: EditorI18nInterface;
  Form: FormI18nInterface;
  Modal: ModalI18nInterface;
  Listbox: ListboxI18nInterface;
  Navigator: NavigatorI18nInterface;
  Validators: ValidatorsI18nInterface;
  Permissions: PermissionsI18nInterface;
  TimePicker: TimePickerI18nInterface;
  TimeAvailablePicker: TimeAvailablePickerI18nInterface;
  AutoComplete: AutoCompleteI18nInterface;
}
