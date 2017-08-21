/*
 MIT License

 Copyright (c) 2017 Temainfo Sistemas

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
    Component, AfterViewInit, Input, forwardRef, ViewChild, ContentChildren, QueryList, OnDestroy,
} from '@angular/core';

import { TabIndexService } from '../form/tabIndex.service';
import { IdGeneratorService } from '../core/helper/idgenerator.service';
import { NameGeneratorService } from '../core/helper/namegenerator.service';
import { ComponentHasModelBase } from '../core/base/component-has-model.base';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { KeyEvent } from '../core/enums/key-events';
import { RadioButtonListService } from './radiobuttonlist.service';

@Component( {
    selector: 'tl-radiobutton',
    templateUrl: './radiobutton.html',
    styleUrls: [ './radiobutton.scss' ],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef( () => TlRadioButton ), multi: true }
    ]
} )
export class TlRadioButton extends ComponentHasModelBase implements AfterViewInit, OnDestroy {

    @Input() label = '';

    @Input() value = '';

    @Input() tabindex = 0;

    @Input() checked = false;

    @ViewChild( 'radiobutton' ) radiobutton;

    @ContentChildren(TlRadioButton) tlradiobutton: QueryList<TlRadioButton>;

    constructor( tabIndexService: TabIndexService, idService: IdGeneratorService,
                 nameService: NameGeneratorService, public radioService: RadioButtonListService ) {
        super( tabIndexService, idService, nameService );
    }


    ngAfterViewInit() {
        this.setElement( this.radiobutton, 'radiobutton' );
        if (!this.name) {
            throw new EvalError( 'The [name] property is required!' );
        }
        if (!this.value) {
            throw new EvalError( 'The [value] property is required!' );
        }
        if (!this.label) {
            throw new EvalError( 'The [label] property is required!' );
        }
        this.validateChecked();
        this.radioService.radioButtonList.push(this.tlradiobutton.toArray()[0]);
        this.radioService.validateCheckedByGroup(this.tlradiobutton);
    }

    onKeyDown( $event: KeyboardEvent ) {
        $event.preventDefault();
        switch ( $event.keyCode ) {
            case KeyEvent.SPACE:
                this.clickRadio();
                break;
        }
    }

    validateChecked() {
        if ( this.checked && !this.tlradiobutton.toArray()[0].componentModel.model ) {
            setTimeout( () => {
                this.clickRadio();
            }, 10 );
        }
    }

    clickRadio() {
        this.radioService.clearModelValueRadioButton(this.tlradiobutton);
        this.modelValue = this.value;
    }

    ngOnDestroy() {
        this.radioService.radioButtonList = [];
    }

}

