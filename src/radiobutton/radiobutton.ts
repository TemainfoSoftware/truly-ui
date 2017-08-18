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
    Component, AfterViewInit, Input, forwardRef, ViewChild
} from '@angular/core';

import { TabIndexService } from '../form/tabIndex.service';
import { IdGeneratorService } from '../core/helper/idgenerator.service';
import { NameGeneratorService } from '../core/helper/namegenerator.service';
import { ComponentHasModelBase } from '../core/base/component-has-model.base';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { KeyEvent } from '../core/enums/key-events';

@Component( {
    selector: 'tl-radiobutton',
    templateUrl: './radiobutton.html',
    styleUrls: [ './radiobutton.scss' ],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef( () => TlRadioButton ), multi: true }
    ]
} )
export class TlRadioButton extends ComponentHasModelBase implements AfterViewInit {

    @Input() label = '';

    @Input() value = '';

    @Input() tabindex = 0;

    @ViewChild( 'radiobutton' ) radiobutton;

    constructor( tabIndexService: TabIndexService, idService: IdGeneratorService,
                 nameService: NameGeneratorService ) {
        super( tabIndexService, idService, nameService );
    }


    ngAfterViewInit() {
        this.setElement( this.radiobutton, 'radiobutton' );
        if ( !this.name ) {
            throw new EvalError( 'The name property is required!' );
        }
    }

    onKeyDown( $event: KeyboardEvent ) {
        $event.preventDefault();
        $event.stopPropagation();
        switch ( $event.keyCode ) {
            case KeyEvent.ENTER:
                this.modelValue = this.value;
                break;
            case KeyEvent.SPACE:
                this.modelValue = this.value;
                break;
        }
    }

}

