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
    Component, ContentChildren, QueryList, Input, AfterContentInit, ViewChild, AfterViewInit, Output,
    EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef,
} from '@angular/core';

import { TlRadioButton } from './radiobutton';
import { ComponentHasModelBase } from '../core/base/component-has-model.base';
import { IdGeneratorService } from '../core/helper/idgenerator.service';
import { TabIndexService } from '../form/tabIndex.service';
import { NameGeneratorService } from '../core/helper/namegenerator.service';
import { MakeProvider } from '../core/base/value-accessor-provider';

const Orientation = {
    VERTICAL: 'vertical',
    HORIZONTAL: 'horizontal'
};

@Component( {
    selector: 'tl-radio-group',
    templateUrl: './radiogroup.html',
    styleUrls: [ './radiobutton.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        [ MakeProvider(TlRadioGroup) ]
    ]
} )
export class TlRadioGroup extends ComponentHasModelBase implements AfterContentInit, AfterViewInit {

    public itemSelected;

    @Input() nameGroup = '';

    @Input() labelGroup = '';

    @Input() label = '';

    @Input() value = '';

    @Input() tabindex = 0;

    @Input() orientation = Orientation.HORIZONTAL;

    @ViewChild( 'radiobutton' ) radiobutton;

    @ContentChildren( TlRadioButton ) listRadioButton: QueryList<TlRadioButton>;

    @Output() private onCheckRadio: EventEmitter<any> = new EventEmitter();

    @Output() private onFocusRadio: EventEmitter<any> = new EventEmitter();


    constructor( tabIndexService: TabIndexService, idService: IdGeneratorService,
                 private change: ChangeDetectorRef,
                 nameService: NameGeneratorService ) {
        super( tabIndexService, idService, nameService );
    }

    ngAfterContentInit() {
        this.setInitialSettings();
    }

    ngAfterViewInit() {
        this.handleInitialValue();
        this.setElement( this.radiobutton, 'radiobutton' );
        this.validateProperty();
        this.validateCheckedRadios();
        this.change.detectChanges();
    }

    validateProperty() {
        if ( (this.orientation !== Orientation.VERTICAL) && (this.orientation !== Orientation.HORIZONTAL) ) {
            throw new EvalError( 'The property [orientation] only receive /vertical/ and /horizontal/ values!' );
        }
    }

    handleInitialValue() {
        setTimeout( () => {
            if ( this.modelValue ) {
                this.handleModelValue();
            } else {
                this.checkFirstItem();
                this.handleChecked();
            }
        }, 1 );
    }


    handleModelValue() {
        this.listRadioButton.toArray().forEach((value2, index, array) => {
            if (this.modelValue === value2.value) {
                this.itemSelected = value2;
                this.change.detectChanges();
            }
        });
    }

    handleChecked() {
        this.listRadioButton.toArray().forEach((item, index, array) => {
            setTimeout( () => {
                this.setItemChecked( item );
            }, 1 );
        });
    }

    setInitialSettings() {
        this.listRadioButton.toArray().forEach( ( item, index, array ) => {
            this.setNameRadioButton( item );
        } );
    }

    setNameRadioButton( item ) {
        item.name = this.nameGroup;
    }

    setItemChecked( item ) {
        if ( item.checked ) {
            return this.checkRadio( item );
        }
    }

    checkFirstItem() {
        setTimeout( () => {
            this.checkRadio( this.listRadioButton.toArray()[ 0 ] );
        }, 1 );
    }

    getCheckedRadios() {
        return this.listRadioButton.filter( ( item, index, array ) => {
            return item.checked;
        } );
    }

    validateCheckedRadios() {
        if ( this.getCheckedRadios().length > 1 ) {
            throw new EvalError( 'Only one radiobutton with [checked] property is allowed' );
        }
    }

    checkRadio( item ) {
        this.modelValue = item.value;
        this.itemSelected = item;
        this.onCheckRadio.emit(this.itemSelected);
        this.change.detectChanges();
    }

    focusRadio(item) {
        this.onFocusRadio.emit(item);
    }
}

