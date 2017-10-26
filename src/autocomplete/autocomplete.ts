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
    AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, EventEmitter,
    forwardRef, Input, OnDestroy, OnInit, Output, Renderer2, TemplateRef, ViewChild
} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { NameGeneratorService } from '../core/helper/namegenerator.service';
import { IdGeneratorService } from '../core/helper/idgenerator.service';
import { TabIndexService } from '../form/tabIndex.service';
import { KeyEvent } from '../core/enums/key-events';
import { TlListBox } from '../listbox/listbox';
import { TlInput } from '../input/input';
import { MakeProvider } from '../core/base/value-accessor-provider';

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
    providers : [ MakeProvider(TlAutoComplete) ]
} )

export class TlAutoComplete extends TlInput implements AfterViewInit, OnInit, OnDestroy {

    @Input() data: Array<any>;

    @Input() id = '';

    @Input() labelDetail = '';

    @Input() labelName = '';

    @Input() openFocus = false;

    @Input() ngModel = '';

    @Input() rowHeight = 30;

    @Input() listStripped = false;

    @ViewChild( 'input' ) input;

    @ViewChild( 'autoComplete' ) autoComplete;

    @ViewChild( 'autocompleteList' ) list;

    @ViewChild(TlListBox) listBox: TlListBox;

    @ContentChild( TemplateRef ) customTemplate: TemplateRef<any>;

    @Output() onAddMore: EventEmitter<any> = new EventEmitter();

    private listPosition;

    private documentListener;

    constructor( public tabIndexService: TabIndexService,
                 public idService: IdGeneratorService,
                 public change: ChangeDetectorRef,
                 public nameService: NameGeneratorService, public renderer: Renderer2, ) {
        super( tabIndexService, idService, nameService, renderer );
    }

    ngOnInit() {
        this.setElement( this.autoComplete, 'autocomplete' );
        this.handleCustom();
    }

    ngAfterViewInit() {
        this.createDocumentListener();
        this.handleAutoCompleteModel();
        this.listPosition = this.list.nativeElement.offsetLeft;
        this.input.labelSize ? this.listPosition += parseInt(this.input.labelSize, 10) : this.listPosition += 100;
        this.listBox.showList = false;
        this.listBox.detectChanges();
        this.getAutoCompleteWidth();
    }

    handleCustom() {
        if (this.customTemplate) {
            this.listBox.customInput = true;
            this.listBox.template = this.customTemplate;
        }
    }

    handleAutoCompleteModel() {
        setTimeout( () => {
            if ( this.ngModel ) {
                this.input.componentModel.model = this.ngModel;
                this.input.element.nativeElement.value = this.ngModel[ this.labelName ];
            }
        }, 1 );
    }

    createDocumentListener() {
        this.documentListener = this.renderer.listen( document, 'click', ( $event ) => {
            if ( this.isNotRelatedWithAutocomplete( $event ) ) {
                this.listBox.showList = false;
                this.listBox.detectChanges();
                return;
            }
            this.handleOpenOnFocus();
        } );
    }

    onKeyDown( $event ) {
        this.handleKeyDown( $event );
    }

    handleOpenOnFocus() {
        if ( this.openFocus && !this.listBox.showList) {
            this.listBox.showList = true;
            this.listBox.detectChanges();
        }
    }

    handleKeyDown($event) {
        switch ($event.keyCode) {
            case KeyEvent.ESCAPE:
                $event.preventDefault();
                $event.stopPropagation();
                this.listBox.showList = false;
                this.input.element.nativeElement.focus();
                this.listBox.resetCursors();
                this.listBox.detectChanges();
                break;
            case KeyEvent.ARROWDOWN:
                $event.preventDefault();
                $event.stopPropagation();
                this.listBox.showList = true;
                this.listBox.detectChanges();
                break;
        }
    }

    addMore() {
        this.onAddMore.emit();
    }

    onInputFocusOut($event) {
        if (!this.isRelatedTargetLi($event) && (!this.isTargetEqualsInputSearch($event))) {
            this.listBox.showList = false;
            this.listBox.detectChanges();
        }
    }

    onClickItemList($event) {
        if ($event[this.labelName]) {
            this.input.element.nativeElement.value = $event[this.labelName];
            this.ngModel = $event;
            this.input.componentModel.model = $event;
            this.input.element.nativeElement.focus();
        }
    }

    isNotRelatedWithAutocomplete( $event ) {
        if (this.isTargetEqualsClearButton($event)) {
            return false;
        }
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

    isTargetEqualsClearButton( $event ) {
        return $event.target.className.includes('-clearbutton');
    }

    isRelatedTargetLi($event) {
        if ($event.relatedTarget) {
            return $event.relatedTarget.nodeName === 'LI';
        }
    }

    isTargetEqualsInputSearch( $event ) {
        return $event.target === this.input.element.nativeElement;
    }

    existAutocompleteInputInPath($event) {
        for (let element = 0; element < $event.path.length; element++) {
            if (this.input.element.nativeElement === $event.path[element]) {
                return true;
            }
        }
        return false;
    }

    getAutoCompleteWidth() {
        return this.input.input.nativeElement.offsetWidth +
            (this.input.input.nativeElement.offsetLeft - parseInt(this.input.labelSize, 10));
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
    }

}
