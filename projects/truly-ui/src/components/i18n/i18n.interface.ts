import { CalendarI18nInterface } from './languages/calendar/index';
import { DatatableI18nInterface } from './languages/datatable/index';
import { DialogI18nInterface } from './languages/dialog/index';
import { FormI18nInterface } from './languages/form/index';
import { ListboxI18nInterface } from './languages/listbox/index';
import { NavigatorI18nInterface } from './languages/navigator/index';
import { ValidatorsI18nInterface } from './languages/validators/index';

export interface I18nInterface {
  locale: string;
  Calendar: CalendarI18nInterface;
  Datatable: DatatableI18nInterface;
  Dialog: DialogI18nInterface;
  Form: FormI18nInterface;
  Listbox: ListboxI18nInterface;
  Navigator: NavigatorI18nInterface;
  Validators: ValidatorsI18nInterface;
}
