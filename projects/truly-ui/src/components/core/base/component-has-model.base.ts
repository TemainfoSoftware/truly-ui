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

import { Input, ViewChild, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ComponentDefaultBase } from './component-default.base';
import { ControlValueAccessor } from '@angular/forms/src/forms';
import { TabIndexService } from '../../form/tabIndex.service';
import { IdGeneratorService } from '../helper/idgenerator.service';
import { NameGeneratorService } from '../helper/namegenerator.service';
import { Validations } from '../validations/validations';

/**
 * Class that controls all Components that have Models.
 */
export class ComponentHasModelBase extends ComponentDefaultBase implements OnInit, ControlValueAccessor, OnDestroy {
    /**
     * Input that receive name attribute.
     */
    @Input() name = '';

    /**
     * Object of validations (receive a bunch of validations).
     */
    @Input() validations: Validations = new Validations();

    /**
     * Text to display in Input Placeholder.
     */
    @Input() placeholder = '';

    /**
     * ViewChild of ngModel input.
     */
    @ViewChild( 'model' ) public componentModel;

    /**
     * Output of Event on Blur element.
     */
    @Output() blur: EventEmitter<any> = new EventEmitter();

    /**
     * Output of Event on Focus element.
     */
    @Output() focus: EventEmitter<any> = new EventEmitter();

    /**
     * Variable of ngModel value.
     */
    public ngValue = '';

    constructor( tabIndexService: TabIndexService,
                 idService: IdGeneratorService,
                 nameService: NameGeneratorService ) {
        super( tabIndexService, idService, nameService );
    }

    /**
     * Callback of control value accessor to register touched changes
     */
    onTouchedCallback: Function = () => {};

    /**
     * Callback of control value accessor to register changes
     */
    onChangeCallback: Function = () => {};

    /**
     * Lifehook of OnInit Angular.
     */
    ngOnInit() {
      this.handleNameComponent();
      if (this.validations) {

        Object.keys( this.validations ).forEach( ( key ) => {
          this[ key ] = this.validations[ key ];
        } );
      }

    }

    get modelValue(): any {
        return this.ngValue;
    }

    set modelValue( value: any ) {
        if ( value !== this.ngValue ) {
            this.ngValue = value;
            this.onChangeCallback( value );
        }
    }

    /**
     * Function that writes value on ngModel.
     * @param value Value received to write value on ngModel
     */
    writeValue( value: any ) {
        if ( ( this.element) && (value !== undefined)) {
            this.ngValue = value;
            this.onChangeCallback( value );
            this.element.nativeElement.value = value;
        }
    }

    /**
     * Function that register change event on input.
     * @param callback Value received to write value on ngModel
     */
    registerOnChange( callback: any ) {
        this.onChangeCallback = callback;
    }

    /**
     * Function that register touched change event on input.
     * @param callback Value received to write value on ngModel
     */
    registerOnTouched( callback: any ) {
        this.onTouchedCallback = callback;
    }

    /**
     * Method that validate if has Validations;
     */

    isRequired() {
      return this.validations && this.validations.required;
    }

    handleNameComponent() {
        if (!this.name) {
            this.name = this.nameService.name;
        }
    }


    /**
     * Function called when input lost it focus.
     */
    onBlur($event) {
        this.onTouchedCallback();
        this.blur.emit($event);
    }

    /**
     * Function called when input receive focus;
     */
    onFocus($event) {
        this.focus.emit($event);
    }

    /**
     * Lifehook called when Angular destroy the class.
     */
    ngOnDestroy() {
        this.idService.clearId();
        this.nameService.clearName();
        this.tabIndexService.clearTabIndex();
    }

}

