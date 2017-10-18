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
    AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter,
    forwardRef, Input, OnDestroy, OnInit, Output, Renderer2, ViewChild
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ComponentHasModelBase } from '../core/base/component-has-model.base';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { NameGeneratorService } from '../core/helper/namegenerator.service';
import { IdGeneratorService } from '../core/helper/idgenerator.service';
import { TabIndexService } from '../form/tabIndex.service';
import { KeyEvent } from '../core/enums/key-events';
import { TlListBox } from '../listbox/listbox';

@Component( {
    selector: 'tl-autocomplete',
    templateUrl: './autocomplete.html',
    styleUrls: [ './autocomplete.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger(
            'enterAnimation', [
                state( 'true', style( { opacity : 1, transform : 'translate(0%,0%)' } ) ),
                state( 'false', style( { opacity : 0, transform : 'translate(0%,-3%)', flex : '0' } ) ),
                transition( '1 => 0', animate( '100ms' ) ),
                transition( '0 => 1', animate( '100ms' ) ),
            ]
        )
    ],
    providers : [
        { provide : NG_VALUE_ACCESSOR, useExisting : forwardRef( () => TlAutoComplete ), multi : true }
    ]
} )

export class TlAutoComplete extends ComponentHasModelBase implements AfterViewInit, OnInit, OnDestroy {

    @Input() data: Array<any>;

    @Input() id = '';

    @Input() label = '';

    @Input() labelDetail = '';

    @Input() labelName = '';

    @Input() openOnFocus = false;

    @ViewChild( 'input' ) input;

    @ViewChild( 'autoComplete' ) autoComplete;

    @ViewChild( 'autocompleteList' ) list;

    @ViewChild(TlListBox) listBox: TlListBox;

    @Output() onAddMore: EventEmitter<any> = new EventEmitter();

    private searching = true;

    private listPosition;

    private documentListener;

    private focusListener;

    private keyDownListener;

    constructor( public renderer: Renderer2,
                 public tabIndexService: TabIndexService,
                 public idService: IdGeneratorService,
                 public change: ChangeDetectorRef,
                 public nameService: NameGeneratorService ) {
        super( tabIndexService, idService, nameService );
    }

    ngOnInit() {
        this.setElement( this.autoComplete, 'autocomplete' );
    }

    ngAfterViewInit() {
        this.createDocumentListener();
        this.handleAutoCompleteModel();
        this.listPosition = this.list.nativeElement.offsetLeft;
        this.input.labelSize ? this.listPosition += this.input.labelSize : this.listPosition += 100;
        this.searching = false;
    }

    handleAutoCompleteModel() {
        setTimeout( () => {
            if ( this.componentModel.model ) {
                this.input.element.nativeElement.value = this.componentModel.model[ this.label ];
            }
        }, 1 );
    }

    createDocumentListener() {
        this.documentListener = this.renderer.listen( document, 'click', ( $event ) => {
            if ( this.isNotRelatedWithAutocomplete( $event ) ) {
                this.searching = false;
                this.change.detectChanges();
                return;
            }
            this.handleOpenOnFocus();
        } );
    }


    onFocusInput() {
        this.handleOpenOnFocus();
    }

    onFocusOut( $event ) {
        if ( !this.isActiveElementEqualsInput() && !this.isRelatedTargetLi($event) ) {
            this.searching = false;
            this.change.detectChanges();
        }
    }

    onKeyDown( $event ) {
        this.searching = true;
        this.change.detectChanges();
        this.handleKeyDown( $event );
    }

    handleOpenOnFocus() {
        if ( this.openOnFocus ) {
            this.searching = true;
            this.change.detectChanges();
        }
    }

    handleKeyDown($event) {
        switch ($event.keyCode) {
            case KeyEvent.ESCAPE:
                this.searching = false;
                this.input.element.nativeElement.focus();
                this.listBox.resetCursors();
                this.change.detectChanges();
                break;
            case KeyEvent.ARROWDOWN:
                $event.stopPropagation();
                this.searching = true;
                this.change.detectChanges();
                break;
        }
    }

    addMore() {
        this.onAddMore.emit();
    }

    onClickItemList($event) {
        this.input.element.nativeElement.value = $event[this.label];
        this.componentModel.model = $event;
        this.searching = false;
        this.input.element.nativeElement.focus();
        this.listBox.resetCursors();
        this.change.detectChanges();
    }

    isNotRelatedWithAutocomplete( $event ) {
        if (!this.existAutocompleteInputInPath($event)) {
            return true;
        }

        if ( this.isTargetEqualsLi ) {
            return false;
        }

        return  !this.isTargetEqualsListBox( $event ) &&
                !this.isTargetParentEqualsLi( $event ) &&
                !this.isTargetEqualsInputSearch( $event );
    }

    isTargetEqualsListBox( $event ) {
        return $event.target.className === 'list-box-container';
    }

    isTargetEqualsLi( $event ) {
        return $event.target.nodeName === 'LI';
    }

    isTargetParentEqualsLi( $event ) {
        return $event.target.parentElement.nodeName === 'LI' || $event.target.parentElement.nodeName === 'UL';
    }

    isRelatedTargetLi($event) {
        return $event.relatedTarget.nodeName === 'LI';
    }

    isTargetEqualsInputSearch( $event ) {
        return $event.target === this.input.element.nativeElement;
    }

    isActiveElementEqualsInput() {
        return document.activeElement === this.input.element.nativeElement;
    }

    existAutocompleteInputInPath($event) {
        for (let element = 0; element < $event.path.length; element++) {
            if (this.input.element.nativeElement === $event.path[element]) {
                return true;
            }
        }
        return false;
    }


    highlight( text: string, search ): string {
        if ( typeof search !== 'object' ) {
            if ( search && text ) {
                let pattern = search.replace( /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&' );
                pattern = pattern.split( ' ' ).filter( ( t ) => {
                    return t.length > 0;
                } ).join( '|' );
                const regex = new RegExp( pattern, 'gi' );

                return text.replace( regex, ( match ) => `<strong>${match}</strong>` );
            }
            return text;
        }
    }

    ngOnDestroy() {
        this.documentListener();
        this.focusListener();
        this.keyDownListener();
    }

}
