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
    AfterViewInit,
    Component, Input,
} from '@angular/core';
import { ComponentHasModelBase } from '../core/base/component-has-model.base';
import { TabIndexService } from '../form/tabIndex.service';
import { IdGeneratorService } from '../core/helper/idgenerator.service';
import { NameGeneratorService } from '../core/helper/namegenerator.service';

@Component( {
    selector: 'tl-radiobutton',
    template: '',
} )
export class TlRadioButton extends ComponentHasModelBase implements AfterViewInit {

    @Input() label = '';

    @Input() value = '';

    @Input() tabindex = 0;

    @Input() checked = false;

    constructor( tabIndexService: TabIndexService, idService: IdGeneratorService, nameService: NameGeneratorService ) {
        super( tabIndexService, idService, nameService );
    }

    ngAfterViewInit() {
        if (!this.name) {
            throw new EvalError( 'The [name] property is required!' );
        }
        if (!this.value) {
            throw new EvalError( 'The [value] property is required!' );
        }
        if (!this.label) {
            throw new EvalError( 'The [label] property is required!' );
        }
    }

}

