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
  Component, Input, Inject,
  Optional, OnInit, AfterViewInit, ViewChild
} from '@angular/core';
import { OverlayAnimation } from '../core/directives/overlay-animation';
import { ElementBase } from '../input/core/element-base';
import { MakeProvider } from '../core/base/value-accessor-provider';
import { NG_ASYNC_VALIDATORS, NG_VALIDATORS, NgModel } from '@angular/forms';

@Component( {
  selector: 'tl-dropdown-icon',
  templateUrl: './dropdownicon.html',
  styleUrls: [ './dropdownicon.scss' ],
  animations: [ OverlayAnimation ],
  providers: [
    [ MakeProvider( TlDropdownIcon ) ]
  ]
} )
export class TlDropdownIcon extends ElementBase<string> implements OnInit, AfterViewInit {

  @Input() data = [];

  @Input() disabled = null;

  @Input() defaultIcon = 'ion ion-ios-search';

  @Input() color = 'basic';

  @Input() heightIcon = '23px';

  @Input() widthIcon = '35px';

  @Input() heightItems = '30px';

  @Input() widthItems = '120px';

  @Input() keyIcon = 'icon';

  @Input() defaultOptionText = 'Select...';

  @Input() hasDefaultOption = true;

  @Input() keyText = 'text';

  @Input() keyValue = 'value';

  @ViewChild( NgModel, {static: true}  ) model: NgModel;

  public optionSelected;

  public typeOfData = 'complex';

  public isOpen: boolean;

  constructor( @Optional() @Inject( NG_VALIDATORS ) validators: Array<any>, @Optional() @Inject( NG_ASYNC_VALIDATORS )
    asyncValidators: Array<any> ) {
    super( validators, asyncValidators );
  }

  ngOnInit() {}

  ngAfterViewInit() {
    const key = Object.keys(this.data)[0];
    if (typeof this.data[key] === 'string' ) {
      this.typeOfData = 'simple';
    }
    if (!this.keyIcon) {
      throw new Error('The property [keyIcon] must be declared');
    }
  }

  onSelectOption( $event ) {
    this.optionSelected = $event;
    this.value = this.optionSelected.option.item[this.keyValue];
    this.isOpen = false;
  }

  onDefaultOption() {
    this.optionSelected = null;
    this.value = '';
    this.isOpen = false;
  }

  getIcon() {
    if (this.optionSelected) {
      return this.optionSelected.option.item.icon;
    }
    return this.defaultIcon;
  }

}

