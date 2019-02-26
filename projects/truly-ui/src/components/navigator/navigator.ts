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
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { NavigatorManagerService } from './services/navigator-manager.service';

@Component( {
    selector: 'tl-navigator',
    templateUrl: './navigator.html',
    styleUrls: [ './navigator.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [NavigatorManagerService]
} )
export class TlNavigator implements OnInit, OnChanges {

  @Input('width') width = '125px';

  @Input('height') height = '32px';

  @Input('type') type: 'monthyear' | 'year' | 'rangeyear' | 'day' = 'monthyear';

  @Input('date') date = new Date();

  @Input('range') range = 11;

  @Input('withBorder') withBorder = true;

  @Output() clickPrevious: EventEmitter<any> = new EventEmitter<any>();

  @Output() clickNext: EventEmitter<any> = new EventEmitter<any>();

  @Output() clickNavigator: EventEmitter<any> = new EventEmitter<any>();

  public description = '';

  constructor(
    public navigatorManager: NavigatorManagerService,
    public change: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.navigatorManager.setType(this.type);
    this.navigatorManager.setRange(this.range);
    this.navigatorManager.setDate(this.date);
    this.setDescription();
  }

  ngOnChanges(change: SimpleChanges) {
    this.navigatorManager.setType(this.type);
    this.navigatorManager.setRange(this.range);
    this.navigatorManager.setDate(this.date);
    this.setDescription();
  }

  onClickPrevious() {
    this.navigatorManager.previous();
    this.setDescription();
    this.clickPrevious.emit( this.navigatorManager.getDataObject() );
  }

  onClickNext() {
    this.navigatorManager.next();
    this.setDescription();
    this.clickNext.emit(this.navigatorManager.getDataObject());
  }

  onClickNavigator() {
    this.clickNavigator.emit(this.navigatorManager.getDataObject());
  }

  private setDescription() {
    this.description = this.navigatorManager.getDescription();
    this.change.detectChanges();
  }
}

