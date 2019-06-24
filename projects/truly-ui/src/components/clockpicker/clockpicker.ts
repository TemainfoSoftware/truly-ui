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
  Component, EventEmitter, Input, Output, ViewChild, Renderer2, Optional, Inject, AfterContentInit,
  OnDestroy, AfterViewInit
} from '@angular/core';
import { NG_ASYNC_VALIDATORS, NG_VALIDATORS, NgModel } from '@angular/forms';
import { TlInput } from '../input/input';
import { ElementBase } from '../input/core/element-base';
import { MakeProvider } from '../core/base/value-accessor-provider';
import { ClockPickerService } from './services/clockpicker.service';

@Component( {
  selector: 'tl-clockpicker',
  templateUrl: './clockpicker.html',
  styleUrls: [ './clockpicker.scss' ],
  providers: [ MakeProvider( TlClockPicker ), ClockPickerService ]
} )
export class TlClockPicker extends ElementBase<string> implements AfterViewInit, AfterContentInit, OnDestroy {

  @Input() label = '';

  @Input() name = '';

  @Input() labelSize = '';

  @Input() textAlign = 'left';

  @Input() labelPlacement = 'left';

  @Input() readonly = false;

  @Input() disabled = false;

  @Input() placeholder = 'ClockPicker Field';

  @Input() clearButton = true;

  @Input() autoClose = false;

  @Input() iconTimepicker = false;

  @Input() showButtonDone = true;

  @Input() buttonDoneMessage = 'Done';

  @Input() color = 'primary';

  @Output() changeTime: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild( NgModel, {static: true}  ) model: NgModel;

  @ViewChild( TlInput, {static: true}  ) tlinput;

  @ViewChild( 'timePickerContent', {static: true}  ) timePickerContent;

  @ViewChild( 'uiClockRadius', {static: true}  ) uiClockRadius;

  @ViewChild( 'wrapperDialMin', {static: true}  ) wrapperDialMin;

  @ViewChild( 'wrapperDial', {static: true}  ) wrapperDial;

  public iconAfter = '';

  public moving = false;

  public time = { hour: '00', minute: '00' };

  public timepickerService: ClockPickerService;

  public isClockPickerAbove: boolean;

  private listeners = [];

  private clockMeasure = { offsetX: 0, offsetY: 0, width: 0, height: 0 };

  private wrapperMeasure = { offsetX: 0, offsetY: 0, width: 0, height: 0 };

  private boxCenter = [];

  constructor( @Optional() @Inject( NG_VALIDATORS ) validators: Array<any>,
               @Optional() @Inject( NG_ASYNC_VALIDATORS ) asyncValidators: Array<any>, private renderer: Renderer2 ) {
    super( validators, asyncValidators );
  }

  ngAfterContentInit() {
    this.timepickerService = new ClockPickerService( this.wrapperDial, this.wrapperDialMin, this.renderer );
    this.timepickerService.createHourDial();
    this.handleModelChange();
    this.handleIconClockPicker();
    this.onCloseClockPicker();
    this.windowMouseMove();
    this.listenDocumentScroll();
    this.documentMouseDown();
  }


  ngAfterViewInit() {
    this.setPickerMeasures();
    this.handleClockPickerPosition();
  }

  handleIconClockPicker() {
    if ( this.iconTimepicker ) {
      this.iconAfter = 'ion-clock';
    }
  }

  setPickerMeasures() {
    setTimeout( () => {
      this.setClockOffset();
      this.setWrapperOffset();
      this.setBoxCenter();
    }, 1 );
  }

  setClockOffset() {
    this.clockMeasure.offsetX = this.uiClockRadius.nativeElement.offsetLeft;
    this.clockMeasure.offsetY = this.uiClockRadius.nativeElement.offsetTop;
    this.clockMeasure.width = this.uiClockRadius.nativeElement.offsetWidth;
    this.clockMeasure.height = this.uiClockRadius.nativeElement.offsetHeight;
  }

  setWrapperOffset() {
    this.wrapperMeasure.offsetX = this.timePickerContent.nativeElement.offsetLeft;
    this.wrapperMeasure.offsetY = this.timePickerContent.nativeElement.offsetTop;
    this.wrapperMeasure.width = this.timePickerContent.nativeElement.offsetWidth;
    this.wrapperMeasure.height = this.timePickerContent.nativeElement.offsetHeight;
  }

  setBoxCenter() {
    this.boxCenter = [
      this.clockMeasure.offsetX + this.wrapperMeasure.offsetX + (this.clockMeasure.width / 2),
      this.clockMeasure.offsetY + this.wrapperMeasure.offsetY - (this.clockMeasure.height / 2)
    ];
  }

  handleModelChange() {
    this.model.valueChanges.subscribe( ( value ) => {
      if ( value ) {
        this.timepickerService.setTimeClock( this.clearMask( this.model.value ) );
      }
    } );
  }

  listenDocumentScroll() {
    this.listeners.push( this.renderer.listen( document, 'scroll', () => {
      this.close();
    } ) );
  }

  windowMouseMove() {
    this.listeners.push( this.renderer.listen( document, 'mousemove', ( $event ) => {

      const positionX = $event.pageX - this.boxCenter[ 0 ];
      const positionY = -($event.pageY - ( this.boxCenter[ 1 ] + this.clockMeasure.height));

      if ( this.moving ) {
        let angle = Math.floor( Math.atan2( positionX, positionY ) * (180 / Math.PI) );
        if ( angle < 0 ) {
          angle = Math.floor( 360 + angle );
        }
        this.timepickerService.setAngleLineHour( angle - (angle % this.timepickerService.getDivisorAngle()) );
        this.timepickerService.getTimeByAngle( angle );
      }
    } ) );
  }

  documentMouseDown() {
    this.renderer.listen( document, 'mousedown', ( $event ) => {
      this.isElementInPath( $event );
    } );
  }

  isElementInPath( $event ) {
    if ( $event.path.indexOf( this.timePickerContent.nativeElement ) < 0 ) {
      this.close();
    }
  }

  setInputValue( value ) {
    this.tlinput.input.nativeElement.value = value.hour + ':' + value.minute;
  }

  close() {
    this.timepickerService.closeClockPicker();
  }

  opened() {
    return this.timepickerService.getOpened();
  }

  changeHour() {
    this.timepickerService.createHourDial();
  }

  changeMinute() {
    this.timepickerService.createMinuteDial();
  }

  onCloseClockPicker() {
    this.timepickerService.change.subscribe( ( value ) => {
      this.setInputValue( value );
      this.changeTime.emit( value );
    } );
  }

  onKeyUp( $event ) {
    const replaced = this.clearMask( $event.target.value );
    if ( replaced.length <= 2 ) {
      this.timepickerService.setTimeClock( replaced );
    } else {
      this.timepickerService.setTimeClock( replaced );
    }
  }

  clearMask( value ) {
    return value.replace( /[^\d]+/g, '' );
  }

  open() {
    this.timepickerService.openClockPicker();
    this.handleClockPickerPosition();
    this.setPickerMeasures();
  }

  onMouseDown() {
    this.moving = true;
  }

  onMouseUp() {
    this.moving = false;
    if ( this.isHourDial() ) {
      setTimeout( () => this.timepickerService.createMinuteDial() );
    } else {
      if ( this.autoClose ) {
        this.timepickerService.closeClockPicker();
      }
    }
  }

  handleClockPickerPosition() {
    const timePickerHeight = this.showButtonDone ? 325 : 300;
    const totalHeight = (this.tlinput.input.nativeElement.getBoundingClientRect().top ) + timePickerHeight;
    if ( (window.innerHeight - totalHeight) < 0 ) {
      this.setTopPositionTop();
      this.setLeftPosition();
      return;
    }
    this.setWrapperClockPickerPositionBottom();
  }

  setTopPositionTop() {
    this.isClockPickerAbove = true;
    const timePickerHeight = this.showButtonDone ? 325 : 300;
    this.timePickerContent.nativeElement.style.top =
      ( this.tlinput.input.nativeElement.getBoundingClientRect().top - this.tlinput.input.nativeElement.offsetHeight )
      - timePickerHeight + 'px';
  }

  setWrapperClockPickerPositionBottom() {
    this.setTopPositionBottom();
    this.setLeftPosition();
  }

  setTopPositionBottom() {
    this.isClockPickerAbove = false;
    this.timePickerContent.nativeElement.style.top =
      ( this.tlinput.input.nativeElement.getBoundingClientRect().top + this.tlinput.input.nativeElement.offsetHeight ) + 'px';
  }

  setLeftPosition() {
    this.timePickerContent.nativeElement.style.left = this.tlinput.input.nativeElement.getBoundingClientRect().left + 'px';
  }


  isHourDial() {
    return this.timepickerService.type === 'hour';
  }

  onClearInput( $event ) {
    $event.stopPropagation();
  }

  ngOnDestroy() {
    this.listeners.forEach( ( value ) => value() );
  }


}

