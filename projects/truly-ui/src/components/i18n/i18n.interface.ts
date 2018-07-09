import { CalendarI18nInterface } from './languages/calendar/index';
import { NavigatorI18nInterface } from './languages/navigator/index';

export interface I18nInterface {
  locale: string;
  Calendar: CalendarI18nInterface;
  Navigator: NavigatorI18nInterface;
}
