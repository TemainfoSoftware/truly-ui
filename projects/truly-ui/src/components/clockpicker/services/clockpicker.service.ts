/*
 MIT License

 Copyright (c) 2019 Temainfo Sistemas

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
import { ElementRef, Injectable, OnDestroy, Renderer2 } from '@angular/core';
import { Subscription, Subject } from 'rxjs';

@Injectable()
export class ClockPickerService implements OnDestroy {

  private subscribe = new Subscription();

  private elementNumber: ElementRef;

  private step;

  private opened = false;

  private angle;

  private relativeAngle;

  private radius;

  private numbers = 12;

  private minNumber = 12;

  private maxNumber = 60;

  private divisor = 30;

  private timeClock = { hour: '00', minute: '00' };

  public type = 'hour';

  public change = new Subject();

  private clockRadius = { height: 200, width: 200 };

  constructor( private wrapperDial: ElementRef, private wrapperDialMin: ElementRef, private renderer: Renderer2 ) {
  }

  createMinHourDial() {
    this.numbers = 12;
    this.minNumber = 0;
    this.divisor = 30;
    this.maxNumber = 12;
    this.type = 'minHour';
    this.setRelativeAngle();
    this.setClockStep();
    this.createNumbers();
    this.angle = this.getClockAngle( this.timeClock.hour );
  }

  createHourDial() {
    this.createMinHourDial();
    this.clearWrapper();
    this.numbers = 12;
    this.minNumber = 12;
    this.divisor = 30;
    this.maxNumber = 24;
    this.type = 'hour';
    this.setRelativeAngle();
    this.setClockStep();
    this.createNumbers();
    this.angle = this.getClockAngle( this.timeClock.hour );
  }

  createMinuteDial() {
    this.clearWrapper();
    this.clearWrapperMin();
    this.numbers = 60;
    this.minNumber = 0;
    this.maxNumber = 60;
    this.divisor = 6;
    this.type = 'minute';
    this.setRelativeAngle();
    this.setClockStep();
    this.createNumbers();
    this.angle = this.getClockAngle( this.timeClock.minute );
  }

  clearWrapper() {
    this.wrapperDial.nativeElement.innerHTML = '';
  }

  clearWrapperMin() {
    this.wrapperDialMin.nativeElement.innerHTML = '';
  }

  getDivisorAngle() {
    return this.divisor;
  }

  getAngleClock() {
    return this.angle;
  }

  setRelativeAngle() {
    this.relativeAngle = -90 * Math.PI / 180;
  }

  setClockStep() {
    this.step = (2 * Math.PI) / this.numbers;
  }

  createNumbers() {
    let hour = this.maxNumber;
    for ( let index = this.maxNumber; index > this.minNumber; index-- ) {
      this.createElementNumber();
      this.setElementNumberValue( hour );
      hour--;
      this.setRadiusNumber();
      this.setStylesNumber();
      this.listenClickNumber( index );
      this.appendElementNumber();
      this.relativeAngle -= this.step;
    }
  }

  createElementNumber() {
    this.elementNumber = new ElementRef( this.renderer.createElement( 'div' ) );
  }

  appendElementNumber() {
    if ( this.type === 'minHour' ) {
      this.renderer.appendChild( this.wrapperDialMin.nativeElement, this.elementNumber.nativeElement );
    } else {
      this.renderer.appendChild( this.wrapperDial.nativeElement, this.elementNumber.nativeElement );
    }
  }

  listenClickNumber( index: number ) {
    this.subscribe.add( this.renderer.listen( this.elementNumber.nativeElement, 'click', ( $event ) => {
      this.setAngleLineHour( index * this.divisor );
      this.change.next( this.timeClock );
    } ) );
  }

  setElementNumberValue( hour: number ) {
    const time = ((hour === 24) || (hour === 60)) ? 0 : hour;
    if ( this.type === 'minHour' ) {
      this.renderer.addClass( this.elementNumber.nativeElement, 'clock-number' );
      this.elementNumber.nativeElement.innerHTML = ('0' + time).slice( -2 );
    }
    if ( this.type === 'minute' && (hour % 5) === 0 ) {
      this.renderer.addClass( this.elementNumber.nativeElement, 'clock-number' );
      this.elementNumber.nativeElement.innerHTML = ('0' + time).slice( -2 );
    }
    if ( this.type === 'hour' ) {
      this.renderer.addClass( this.elementNumber.nativeElement, 'clock-number' );
      this.elementNumber.nativeElement.innerHTML = ('0' + time).slice( -2 );
    }
  }

  setRadiusNumber() {
    this.radius = Math.round( (this.clockRadius.width / 2) - (this.type !== 'minHour' ? 15 : 40) );
  }

  setStylesNumber() {
    this.renderer.setStyle( this.elementNumber.nativeElement, 'position', 'absolute' );
    this.renderer.setStyle( this.elementNumber.nativeElement, 'left', this.getAngleX() + 'px' );
    this.renderer.setStyle( this.elementNumber.nativeElement, 'top', this.getAngleY() + 'px' );
  }

  setAngleLineHour( angle: number ) {
    this.angle = angle;
    if ( this.type === 'minute' ) {
      this.divisor = 6;
      this.timeClock.minute = ('0' + angle / this.divisor).slice( -2 );
    } else {
      this.divisor = 30;
      this.timeClock.hour = ('0' + angle / this.divisor).slice( -2 );
    }
  }

  setTimeClock( value: string ) {
    value.length > 2 ? this.createMinuteDial() : this.createHourDial();
    if ( value.length === 2 ) {
      this.timeClock.hour = String( value.substring( 0, 2 ) );
      this.angle = this.getClockAngle( this.timeClock.hour );
    } else if ( value.length === 4 ) {
      this.timeClock.hour = String( value.substring( 0, 2 ) );
      this.timeClock.minute = String( value.substring( 2, 4 ) );
      this.angle = this.getClockAngle( this.timeClock.minute );
    }
  }

  closeClockPicker() {
    this.opened = false;
  }

  getTimeByAngle( angle ) {
    if ( this.type === 'hour' ) {
      const time = Math.floor( (12 * angle) / 360 ) + 12;
      this.timeClock.hour = time > 12 ? time + '' : '00';
      this.change.next( this.timeClock );
    } else {
      const time = Math.floor( (60 * angle) / 360 );
      this.timeClock.minute = ( '0' + time).slice( -2 );
      this.change.next( this.timeClock );
    }
  }

  getClockAngle( value ) {
    let radius = 12;
    if ( this.type === 'minute' ) {
      radius = 60;
    }
    return (parseInt( value, 10 ) / radius) * 360;
  }

  getClockPickerValue() {
    return this.timeClock;
  }

  openClockPicker() {
    this.opened = true;
  }

  getOpened() {
    return this.opened;
  }

  getAngleX() {
    return Math.round( this.radius * Math.cos( this.relativeAngle ) + (this.clockRadius.width / 2 ) );
  }

  getAngleY() {
    return Math.round( this.radius * Math.sin( this.relativeAngle ) + (this.clockRadius.height / 2 ) );
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }


}
