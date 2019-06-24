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
  Input,
  AfterContentInit,
  Component,
  forwardRef,
  ElementRef,
  ContentChild,
  ViewChild,
  OnDestroy,
  Output,
  EventEmitter,
  AfterViewInit,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { TlLeftPadPipe } from '../internals/pipes/leftpad.pipe';
import { OverlayAnimation } from '../core/directives/overlay-animation';
import { Subscription } from 'rxjs';
import { I18nService } from '../i18n/i18n.service';
import { ValueAccessorBase } from '../input/core/value-accessor';
import { FormControlName, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';
import {FixedPositionDirective} from '../misc/fixed-position.directive';

export interface IncrementalSteps {
  hour: number;
  minute: number;
}

export enum TIME {
  MINUTE = 'minute',
  HOUR = 'hour'
}

@Component( {
  selector: 'tl-timepicker',
  templateUrl: './timepicker.html',
  styleUrls: [ './timepicker.scss' ],
  providers: [ {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef( () => TlTimepicker ),
    multi: true,
  } ],
  animations: [ OverlayAnimation ]
} )
export class TlTimepicker extends ValueAccessorBase<Date | string> implements AfterContentInit, AfterViewInit, OnChanges, OnDestroy {

  @Input() format: '12' | '24' = '24';

  @Input() flatBorder = false;

  @Input() showTimeIcon = false;

  @Input() label = '';

  @Input() labelPlacement = 'left';

  @Input() labelSize = '100px';

  @Input() height = '23px';

  @Input() readonly: boolean = null;

  @Input() disabled: boolean = null;

  @Input() withBorder = true;

  @Input() steps: IncrementalSteps = { hour: 1, minute: 1 };

  @Input() availableTimes = [];

  @Input() color = 'basic';

  @Input() name = '';

  @Input() isoModel = false;

  @Input() min: Date = new Date( 1999, 0, 1, 0, 0 );

  @Input() max: Date = new Date( 1999, 0, 1, 23, 59 );

  @ViewChild( 'listHour', {static: true} ) listHour: ElementRef;

  @ViewChild( 'listMinutes', {static: true} ) listMinutes: ElementRef;

  @ViewChild( 'listAmPm', {static: true} ) listAmPm: ElementRef;

  @ContentChild( NgModel, {static: true} ) ngModel: NgModel;

  @ContentChild( FormControlName, {static: true} ) control: NgModel;

  @Output() now: EventEmitter<any> = new EventEmitter();

  @Output() changeTime: EventEmitter<string> = new EventEmitter();

  @Output() confirm: EventEmitter<Date | string> = new EventEmitter();

  @Output() cancel: EventEmitter<Date | string> = new EventEmitter();

  public isOpen = false;

  public trigger;

  public nowText = this.i18n.getLocale().TimePicker.now;

  public selectedTime = '10:30 AM';

  public minutes = [];

  public hours = [];

  public minute: number | string = 0;

  public hour: number | string = 0;

  public timeZone = 'AM';

  public textConfirm = this.i18n.getLocale().TimePicker.textConfirm;

  public textCancel = this.i18n.getLocale().TimePicker.textCancel;

  private headerHeight = 45;

  private border = 3;

  private nullElements = 80;

  private itemHeight = 30;

  private loaded = false;

  private leftPad = new TlLeftPadPipe();

  private listeners: Subscription = new Subscription();

  constructor( private i18n: I18nService ) {
    super();
  }

  ngAfterContentInit() {
    this.handleCreateRing();
    if (!this.value) {
      this.value = new Date();
    }
    this.setModelValue( new Date(this.value) );
  }

  ngAfterViewInit() {
    this.listenControlChanges();
  }

  listenControlChanges() {
    if (this.getControl()) {
      this.getControl().control.valueChanges.subscribe(( date: Date) => {
        if (!this.loaded) {
          this.minute = this.leftPad.transform(new Date(date).getMinutes(), 2);
          this.hour = this.leftPad.transform(new Date(date).getHours(), 2);
          this.formatTime();
        }
      });
    }
  }

  private handleCreateRing() {
    this.createHourRing();
    this.createMinuteRing();
  }

  private createHourRing() {
    let lastHour = this.min.getHours() - this.steps.hour;
    for ( let i = 0; i <= this.max.getHours(); i++ ) {
      if ( i === ( lastHour + this.steps.hour) ) {
        this.hours.push( i );
        lastHour = i;
      }
    }
  }

  private createMinuteRing() {
    let lastMinute = this.min.getMinutes() - this.steps.minute;
    for ( let i = 0; i <= this.max.getMinutes(); i++ ) {
      if ( i === ( lastMinute + this.steps.minute) ) {
        this.minutes.push( i );
        lastMinute = i;
      }
    }
  }

  changeOpened() {
    this.isOpen = !this.isOpen;
    setTimeout(() => {
      this.onChangeValue( this.selectedTime );
      this.loaded = true;
    });
  }

  private setModelValue( value ) {
    if ( value instanceof Date ) {
      this.hour = this.leftPad.transform(value.getHours(), 2);
      this.minute = this.leftPad.transform(value.getMinutes(), 2);
      this.formatTime();
      this.onChangeValue( this.hour + ':' + this.minute );
    }
  }

  onMouseDownContainer( $event ) {
    $event.stopPropagation();
  }

  private emitClickNow() {
    this.now.emit( this.isFormat24() ? this.value : {
      time: this.selectedTime,
      timeZone: this.timeZone
    } );
  }

  onBlur() {
    this.propagateTouched();
  }

  onClickNow() {
    const convert = this.isFormat12() ? this.convertToAmPm( new Date().getHours() ) : new Date().getHours();
    this.hour = this.leftPad.transform( convert, 2 );
    this.minute = this.leftPad.transform( new Date().getMinutes(), 2 );
    this.formatTime();
    this.onChangeValue( this.hour + ':' + this.minute );
    this.setValue();
    this.emitClickNow();
  }

  private getControl() {
    return this.control ? this.control : this.ngModel;
  }

  private setValue() {
    const dateSt = new Date(this.value);
    const year = dateSt.getFullYear();
    const month = dateSt.getMonth();
    const date = dateSt.getDate();
    const hour = parseInt( <string>this.hour, 10);
    const minute = parseInt( <string>this.minute, 10);
    this.value = this.isoModel ? new Date( year, month, date, hour, minute ).toISOString() :
      new Date( year, month, date, hour, minute );
  }

  onScrollHour( $event ) {
    const scroll = Math.round( ( $event.target.scrollTop / this.itemHeight ) );
    this.hour = this.steps.hour > 0 ? (scroll * this.steps.hour) : scroll;
  }

  onScrollMinutes( $event ) {
    const scroll = Math.round( ( $event.target.scrollTop / this.itemHeight ) );
    this.minute = this.steps.minute > 0 ? (scroll * this.steps.minute) : scroll;
  }

  onClickCancel() {
    this.isOpen = false;
    this.loaded = false;
    this.setValue();
    this.cancel.emit( this.value );
  }

  onClickConfirm() {
    this.isOpen = false;
    this.loaded = false;
    this.setValue();
    this.formatTime();
    this.confirm.emit( this.value );
  }

  onChangeValue( stringTime ) {
    this.selectedTime = stringTime;
    if ( !stringTime ) {
      return;
    }
    const split = this.cleanValue( stringTime ).split( ':' );
    const hour = this.leftPad.transform(split[0], 2);
    const min = this.leftPad.transform(split[1], 2);

    if ( min.length >= 2 ) {
      this.hour = this.isFormat12() ? this.leftPad.transform( this.convertToAmPm( hour ), 2 ) : hour;
      if ( this.listHour ) {
        this.setScrollColumn( this.listHour.nativeElement, TIME.HOUR );
        this.setValue();
      }
    }
    if ( hour.length >= 2 ) {
      this.minute = min;
      if ( this.listMinutes ) {
        this.setScrollColumn( this.listMinutes.nativeElement, TIME.MINUTE );
        this.setValue();
      }
    }
  }

  private setScrollColumn( elementScroll: HTMLElement, type: TIME ) {
    const element: any = this.getDataIndex( type );
    if ( element ) {
      setTimeout( () => {
        elementScroll.scrollTop =
          element.offsetTop - ( this.nullElements + this.headerHeight + this.border ) - this.itemHeight;
      }, 100 );
    }
  }

  private getDataIndex( type: TIME ) {
    return type === TIME.HOUR ? this.getItemByDataIndexHour() : this.getItemByDataIndexMinute();
  }

  private convertToAmPm( hour ) {
    const timeString = hour + ':00:00';
    const hourEnd = timeString.indexOf( ':' );
    const H = +timeString.substr( 0, hourEnd );
    this.timeZone = H < 12 ? 'AM' : 'PM';
    this.timeZone === 'AM' ? this.setAm() : this.setPm();
    return H % 12 || 12;
  }

  private getItemByDataIndexMinute() {
    const strDataIndex: string = 'div[dataIndexMinute="' + this.minute + '"]';
    return document.querySelector( strDataIndex );
  }

  private getItemByDataIndexHour() {
    const strDataIndex: string = 'div[dataIndexHour="' + this.hour + '"]';
    return document.querySelector( strDataIndex );
  }

  private cleanValue( value ) {
    return value.replace( /_/g, '' );
  }

  private isFormat24() {
    return this.format === '24';
  }

  private isFormat12() {
    return this.format === '12';
  }

  isTimeZonePM() {
    return this.timeZone === 'PM';
  }

  isTimeZoneAM() {
    return this.timeZone === 'AM';
  }

  setMinute(minute: number) {
    this.minute = minute;
    this.formatTime();
    this.setValue();
  }

  setHour(hour: number) {
    this.hour = hour;
    this.formatTime();
    this.setValue();
  }

  clickListItem( scrollElement, $event ) {
    scrollElement.scrollTop =
      $event.target.offsetTop - ( this.nullElements + this.headerHeight + this.border ) - this.itemHeight;
  }

  setAm() {
    this.timeZone = 'AM';
  }

  setPm() {
    this.timeZone = 'PM';
  }

  onClose() {
    this.isOpen = false;
    this.loaded = false;
  }

  getFormattedHour() {
    return this.leftPad.transform( this.hour, 2 ) + ':' + this.leftPad.transform( this.minute, 2 );
  }

  private formatTime() {
    this.selectedTime = this.getFormattedHour();

  }

  ngOnChanges( changes: SimpleChanges ) {
  }

  ngOnDestroy() {
    this.listeners.unsubscribe();
  }

}
