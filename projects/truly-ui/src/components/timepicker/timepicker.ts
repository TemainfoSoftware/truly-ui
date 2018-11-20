/*
 MIT License

 Copyright (c) 2018 Temainfo Software

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
  Input, AfterContentInit, Optional, Inject, Component, forwardRef, ElementRef, OnInit, ViewChild,
  Renderer2, OnDestroy, Output, EventEmitter,
} from '@angular/core';
import { TlLeftPadPipe } from '../internals/pipes/leftpad.pipe';
import { ElementBase } from '../input/core/element-base';
import { NG_ASYNC_VALIDATORS, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';
import { OverlayAnimation } from '../core/directives/overlay-animation';
import { Subscription } from 'rxjs';

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
export class TlTimepicker extends ElementBase<string> implements OnInit, AfterContentInit, OnDestroy {

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

  @Input() color = 'basic';

  @Input() name = '';

  @ViewChild( 'listHour' ) listHour: ElementRef;

  @ViewChild( 'listMinutes' ) listMinutes: ElementRef;

  @ViewChild( 'listAmPm' ) listAmPm: ElementRef;

  @Output() now: EventEmitter<any> = new EventEmitter();

  @Output() changeTime: EventEmitter<string> = new EventEmitter();

  @Output() confirm: EventEmitter<string> = new EventEmitter();

  @Output() cancel: EventEmitter<string> = new EventEmitter();

  public model: NgModel;

  public isOpen = false;

  public trigger;

  public nowText = 'Now';

  public selectedTime = '10:30 AM';

  public minutes = [];

  public hours = [];

  public minute: number | string = 0;

  public hour: number | string = 0;

  public timeZone = 'AM';

  public value = '';

  private headerHeight = 45;

  private border = 3;

  private nullElements = 80;

  private itemHeight = 30;

  private leftPad = new TlLeftPadPipe();

  private listeners: Subscription = new Subscription();

  constructor( @Optional() @Inject( NG_VALIDATORS ) validators: Array<any>,
               @Optional() @Inject( NG_ASYNC_VALIDATORS ) asyncValidators: Array<any>, private renderer: Renderer2 ) {
    super( validators, asyncValidators );
  }

  ngOnInit() {
    this.minutes = Array( 60 ).fill( 0 ).map( ( x, i ) => i );
    this.hours = Array( this.getFormatHourNumber() ).fill( 0 ).map( ( x, i ) => i );
  }

  ngAfterContentInit() {
    this.listenContainer();
    this.formatTime();
  }

  private getFormatHourNumber() {
    return this.isFormat12() ? 13 : 24;
  }

  private listenContainer() {
    this.listeners.add( this.renderer.listen( document, 'click', () => {
      this.isOpen = false;
    } ) );
  }

  mouseDownContainer( $event ) {
    $event.stopPropagation();
  }

  private emitClickNow() {
    this.now.emit( this.isFormat24() ? this.selectedTime : {
      time: this.selectedTime,
      timeZone: this.timeZone
    } );
  }

  onClickNow() {
    const convert = this.isFormat12() ? this.convertToAmPm( new Date().getHours() ) : new Date().getHours();
    this.hour = this.leftPad.transform( convert, 2 );
    this.minute = this.leftPad.transform( new Date().getMinutes(), 2 );
    this.formatTime();
    this.onChangeValue( this.hour + ':' + this.minute );
    this.emitClickNow();
    this.value = this.selectedTime;
  }

  onScrollHour( $event ) {
    this.hour = Math.round( $event.target.scrollTop / this.itemHeight );
    this.formatTime();
  }

  onScrollMinutes( $event ) {
    this.minute = Math.round( $event.target.scrollTop / this.itemHeight );
    this.formatTime();
  }

  onScrollAmPm( $event ) {
    $event.target.scrollTop >= (this.itemHeight / 2) ? this.timeZone = 'PM' : this.timeZone = 'AM';
  }

  onClickCancel() {
    this.isOpen = false;
    this.cancel.emit(this.selectedTime);
  }

  onClickConfirm() {
    this.isOpen = false;
    this.confirm.emit(this.selectedTime);
  }

  onChangeValue( $event ) {
    if ( !$event ) {
      return;
    }
    const split = this.cleanValue( $event ).split( ':' );
    if ( split[ 0 ].length >= 2 ) {
      if ( this.isFormat12() ) {
        this.hour = this.leftPad.transform( this.convertToAmPm( split[ 0 ] ), 2 );
      } else {
        this.hour = split[ 0 ];
      }
      const element: any = this.getItemByDataIndexHour();
      if ( element ) {
        this.listHour.nativeElement.scrollTop =
          element.offsetTop - ( this.nullElements + this.headerHeight + this.border ) - this.itemHeight;
      }
    }
    if ( split[ 1 ].length >= 2 ) {
      this.minute = split[ 1 ];
      const element: any = this.getItemByDataIndexMinute();
      if ( element ) {
        this.listMinutes.nativeElement.scrollTop =
          element.offsetTop - ( this.nullElements + this.headerHeight + this.border ) - this.itemHeight;
      }
    }
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

  clickListItem( scrollElement, $event ) {
    scrollElement.scrollTop =
      $event.target.offsetTop - ( this.nullElements + this.headerHeight + this.border ) - this.itemHeight;
    setTimeout( () => {
      this.value = this.selectedTime;
    }, 100 );
  }

  setAm() {
    if ( this.listAmPm ) {
      this.listAmPm.nativeElement.scrollTop = 0;
    }
  }

  setPm() {
    if ( this.listAmPm ) {
      this.listAmPm.nativeElement.scrollTop = this.itemHeight * 2;
    }
  }

  private formatTime() {
    this.selectedTime = this.leftPad.transform( this.hour, 2 ) + ':' + this.leftPad.transform( this.minute, 2 );
  }

  ngOnDestroy() {
    this.listeners.unsubscribe();
  }


}
