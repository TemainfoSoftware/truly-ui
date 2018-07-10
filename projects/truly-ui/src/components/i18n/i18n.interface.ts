import { CalendarI18nInterface } from './languages/calendar/index';
import { DialogI18nInterface } from './languages/dialog/index';
import { NavigatorI18nInterface } from './languages/navigator/index';

export interface I18nInterface {
  locale: string;
  Calendar: CalendarI18nInterface;
  Dialog: DialogI18nInterface;
  Navigator: NavigatorI18nInterface;
}
