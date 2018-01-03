/*
 MIT License

 Copyright (c) 2018 Temainfo Sistemas

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
    AfterViewInit,
    Output,
    EventEmitter, Renderer2,
} from '@angular/core';
import { ComponentHasModelBase } from '../core/base/component-has-model.base';
import { TabIndexService } from '../form/tabIndex.service';
import { IdGeneratorService } from '../core/helper/idgenerator.service';
import { NameGeneratorService } from '../core/helper/namegenerator.service';
import { InputMask } from './input-mask';
import { MakeProvider } from '../core/base/value-accessor-provider';

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
    providers: [ MakeProvider(TlInput) ]
} )
export class TlInput extends ComponentHasModelBase implements AfterViewInit {


    /**
     * Text placed before Input.
     */
    @Input() textBefore = '';

    /**
     * Text placed before Input.
     */
    @Input() textAfter = '';

    /**
     * Property to label placement [default]='left'
     * 'left' | 'top'
     */
    @Input() labelPlacement = 'left';

    /**
     * Property to labelSize
     */
    @Input() labelSize = '100px';

    /**
     * Label of Input
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
     */
    @Input() clearButton: boolean;

    /**
     * Controller to make an input readonly.
     */
    @Input() readonly: boolean = null;

    /**
     * Controller to make an input disabled.
     */
    @Input() disabled: boolean = null;

    /**
     * Property to control autocomplete input
     */
    @Input() autocomplete = 'off';

    /**
     * TabIndex of Element;
     */
    @Input() tabindex = 0;

    /**
     * Define the alignment of the text inside of the input.
     */
    @Input() textAlign;


    @Input() mask;

    /**
     * Type of Input
     */
    @Input() type = 'text';

    /**
     * The element itself to be manipulated
     */
    @ViewChild( 'input' ) public input;

    /**
     * View for textAfter
     */
    @ViewChild('afterText') public textClearButton;

    /**
     * View for textAfter
     */
    @ViewChild('afterIcon') public iconClearButton;

    /**
     * Output event for clear button
     */
    @Output() clear: EventEmitter<any> = new EventEmitter();


    @Output() clickAddon: EventEmitter<any> = new EventEmitter();


    /**
     * Control the position of the clearButton.
     */
    private clearButtonPosition;

    private fieldMask: InputMask;

    /**
     * Constructor
     */
    constructor(tabIndexService: TabIndexService, idService: IdGeneratorService, nameService: NameGeneratorService,
                public renderer: Renderer2) {
        super(tabIndexService, idService, nameService);
    }

    /**
     * LifeHook Angular
     */
    ngAfterViewInit() {
        this.setElement( this.input, 'input' );
        this.validateClearButtonPosition();
        this.hasMask();


    }

    hasMask() {
        if (this.mask) {
            this.fieldMask = new InputMask(this, this.renderer, this.mask );
        }
    }

    validateClearButtonPosition() {
        if (this.textClearButton) {
            this.clearButtonPosition = this.textClearButton.nativeElement.offsetWidth + 5;
        }
        if (this.iconClearButton) {
            this.clearButtonPosition = this.iconClearButton.nativeElement.offsetWidth + 5;
        }
        if (this.textClearButton && this.iconClearButton) {
            this.clearButtonPosition =
                (this.textClearButton.nativeElement.offsetWidth + this.iconClearButton.nativeElement.offsetWidth) + 5;
        }
    }

    onClickAddon(MouseEvent, side) {
        this.clickAddon.emit({MouseEvent, side});
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
