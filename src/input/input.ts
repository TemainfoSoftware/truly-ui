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
    Component,
    Input,
    ViewChild,
    forwardRef,
    AfterViewInit,
    ChangeDetectionStrategy,
    Output,
    EventEmitter, ViewEncapsulation, ChangeDetectorRef
} from '@angular/core';
import { ComponentHasModelBase } from '../core/base/component-has-model.base';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TabIndexService } from '../form/tabIndex.service';
import { IdGeneratorService } from '../core/helper/idgenerator.service';
import { NameGeneratorService } from '../core/helper/namegenerator.service';

/**
 * Input Component personalized with few features.
 *
 * import { InputModule } from 'truly-ui';
 *
 * @Component({
 *  selector: 'my-app-comp',
 *  template: '
 *  <tl-input
 *   [(ngModel)]="title"
 *   [iconBefore]="'ion-email'"
 *   [iconAfter]="'ion-email'"
 *   [textBefore]="'R$'"
 *   [textAfter]="'00,00'"
 *   [placeholder]="'Meu Input'"
 *   [clearButton]="true"
 *   [readonly]="true"
 *   [disabled]="true"
 *   [toUpperCase]="true">
 *  </tl-input>
 *  '
 * })
 */
@Component( {
    selector: 'tl-input',
    templateUrl: './input.html',
    styleUrls: [ './input.scss' ],
    encapsulation: ViewEncapsulation.None,
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef( () => TlInput ), multi: true }
    ]
} )
export class TlInput extends ComponentHasModelBase implements AfterViewInit {


    /**
     * Text placed before Input.
     * @type {string}
     */
    @Input() textBefore = '';

    /**
     * Text placed before Input.
     * @type {string}
     */
    @Input() textAfter = '';

    /**
     * Property to label placement [default]='left'
     * 'left' | 'top'
     * @type {string}
     */
    @Input() labelPlacement = 'left';

    /**
     * Property to labelSize
     * @type {string}
     */
    @Input() labelSize = '';

    /**
     * Label of Input
     * @type {string}
     */
    @Input() label = '';

    /**
     * Class of an Icon placed Before Input. Example usage:
     *
     * ```html
     * <tl-input [iconBefore]="'ion-email'"></tl-input>
     * ```
     *
     * ```html
     * <tl-input [iconBefore]="'fa fa-user'"></tl-input>
     * ```
     */
    @Input() iconBefore = '';

    /**
     * Class of an Icon placed After Input.
     *
     * ```html
     * <tl-input [iconAfter]="'ion-email'"></tl-input>
     * ```
     *
     * ```html
     * <tl-input [iconAfter]="'fa fa-address-card'"></tl-input>
     * ```
     */
    @Input() iconAfter = '';

    /**
     * Controller to display clear button after type something [default] = false.
     * @type {boolean}
     */
    @Input() clearButton: boolean;

    /**
     * Controller to make an input readonly.
     * @type {boolean}
     */
    @Input() readonly: boolean = null;

    /**
     * Controller to make an input disabled.
     * @type {boolean}
     */
    @Input() disabled: boolean = null;

    /**
     * Property to control autocomplete input
     */
    @Input() autocomplete: boolean = null;


    /**
     * Property required.
     * @type {boolean}
     */
    @Input() required = false;

    /**
     * TabIndex of Element;
     */
    @Input() tabindex = 0;

    /**
     * The element itself to be manipulated
     */
    @ViewChild( 'input' ) public input;

    /**
     * Output event for clear button
     * @type {EventEmitter}
     */
    @Output() clear: EventEmitter<any> = new EventEmitter();

    /**
     * Constructor
     */
    constructor(tabIndexService: TabIndexService, idService: IdGeneratorService, nameService: NameGeneratorService) {
        super(tabIndexService, idService, nameService);
    }

    /**
     * LifeHook Angular
     */
    ngAfterViewInit() {
        this.setElement( this.input, 'input' );
    }

    /**
     * Function to clear input value.
     */
    clearInput() {
        this.writeValue('');
        this.input.nativeElement.focus();
        this.clear.emit();
    }

}
