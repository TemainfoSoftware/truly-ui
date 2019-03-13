/*
 MIT License

 Copyright (c) 2019 Temainfo Software

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */

import {
  ComponentFactoryResolver, ComponentRef, Injectable,
  ViewContainerRef
} from '@angular/core';

import { TlCalendarDays } from '../parts/calendar-days';
import { TlCalendarMonths } from '../parts/calendar-months';
import { TlCalendarYears } from '../parts/calendar-years';

@Injectable()
export class CalendarService {

  private component: ComponentRef<any>;

  private view: ViewContainerRef;

  private calendar;

  constructor( private compiler: ComponentFactoryResolver ) {
  }

  setView( view: ViewContainerRef ) {
    this.view = view;
  }

  setConfigCalendar( calendar ) {
    this.calendar = calendar;
  }

  generateDays() {
    this.clearBody();
    this.createTableDays();
  }

  generateMonths() {
    this.clearBody();
    this.createTableMonths();
  }

  generateYears(range) {
    this.clearBody();
    this.createTableYears(range);
  }

  createTableYears(range) {
    this.handleComponentCreated();
    const componentFactory = this.compiler.resolveComponentFactory( TlCalendarYears );
    this.component = this.view.createComponent( componentFactory );
    (<TlCalendarYears>this.component.instance).setCalendar(this.calendar, range);
    this.relocateTable();
  }

  createTableMonths() {
    this.handleComponentCreated();
    const componentFactory = this.compiler.resolveComponentFactory( TlCalendarMonths );
    this.component = this.view.createComponent( componentFactory );
    (<TlCalendarMonths>this.component.instance).setCalendar(this.calendar);
    this.relocateTable();
  }

  changeStatus() {
    (<TlCalendarDays>this.component.instance).changeStatus();
  }

  createTableDays() {
    this.handleComponentCreated();
    const componentFactory = this.compiler.resolveComponentFactory( TlCalendarDays );
    this.component = this.view.createComponent( componentFactory );
    (<TlCalendarDays>this.component.instance).setCalendar(this.calendar);
    this.relocateTable();
  }

  relocateTable() {
    this.calendar.renderer.appendChild(this.component.location.nativeElement,
      this.calendar.table.nativeElement);
    this.calendar.renderer.appendChild(this.calendar.wrapper.nativeElement,
      this.component.location.nativeElement);
  }

  handleComponentCreated() {
    if (this.component) {
      this.component.destroy();
    }
  }

  clearBody() {
    this.calendar.tbody.nativeElement.innerHTML = '';
  }

  setSelectedDay(cell, $event) {
    (<TlCalendarDays>this.component.instance).setSelectedDay(cell, $event);
  }

}
