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
  Component, ElementRef, Input, ViewChild, Output, EventEmitter, OnInit
} from '@angular/core';

@Component( {
    selector: 'tl-button',
    templateUrl: './button.html',
    styleUrls: [ './button.scss' ],
} )
export class TlButton implements OnInit {

    @Input() text = '';

    @Input() first = false;

    @Input() last = false;

    @Input() iconAddonBefore = '';

    @Input() iconAddonAfter = '';

    @Input() iconBeforeText = '';

    @Input() iconAfterText = '';

    @Input() height = '30px';

    @Input() width = '120px';

    @Input() defaultFocus = false;

    @Input() disabled = null;

    @Input() toggle = false;

    @Input() colorIconBefore = '';

    @Input() colorIconAfter = '';

    @Input() formResult;

    @Input() color = 'basic';

    @Output() selected: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild( 'tlbutton' ) buttonElement: ElementRef;

    public shortcutManager = {};

    constructor( public button: ElementRef ) {}

    ngOnInit() {}
}

