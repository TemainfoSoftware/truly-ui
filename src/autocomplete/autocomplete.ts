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
    AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component,
    forwardRef, Input, OnDestroy, OnInit, Renderer2, ViewChild
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { ComponentHasModelBase } from '../core/base/component-has-model.base';

import { NameGeneratorService } from '../core/helper/namegenerator.service';
import { IdGeneratorService } from '../core/helper/idgenerator.service';
import { TabIndexService } from '../form/tabIndex.service';
import { KeyEvent } from '../core/enums/key-events';

@Component( {
    selector: 'tl-autocomplete',
    templateUrl: './autocomplete.html',
    styleUrls: [ './autocomplete.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
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

    @ViewChild( 'input' ) input;

    @ViewChild( 'autoComplete' ) autoComplete;

    @ViewChild( 'autocompleteList' ) list;

    private searching = true;

    private listPosition;

    private documentListener;

    private inputListener;

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
        this.createListenerInput();
        this.listPosition = this.list.nativeElement.offsetLeft;
        this.input.labelSize ? this.listPosition += this.input.labelSize : this.listPosition += 100;
        this.searching = false;
    }

    createDocumentListener() {
        this.documentListener = this.renderer.listen( document, 'mousedown', ( $event ) => {
            this.isNotRelatedWithAutocomplete( $event )
                ? this.searching = false : this.searching = true;
            this.change.detectChanges();
        } );
    }

    createListenerInput() {
        this.inputListener = this.renderer.listen(this.input.element.nativeElement, 'keydown', ($event) => {
           this.handleKeyDown($event);
        });
    }

    handleKeyDown($event) {
        switch ($event.keyCode) {
            case KeyEvent.ESCAPE:
                this.searching = false;
                this.change.detectChanges();
                break;
            case KeyEvent.ARROWDOWN:
                $event.stopPropagation();
                this.searching = true;
                this.change.detectChanges();
                break;
        }
    }

    onClickItemList($event) {
        this.input.element.nativeElement.value = $event[this.label];
        this.input.componentModel.model = $event;
        this.searching = false;
        this.change.detectChanges();
        console.log('click', $event);
    }

    isNotRelatedWithAutocomplete( $event ) {
        return !this.isTargetEqualsListBox( $event ) && !this.isTargetParentEqualsLi( $event )
            && !this.isTargetEqualsInputSearch( $event );
    }

    isTargetEqualsListBox( $event ) {
        return $event.target.className === 'list-box-container';
    }

    isTargetParentEqualsLi( $event ) {
        return $event.target.parentElement.nodeName === 'LI' || $event.target.parentElement.nodeName === 'UL';
    }

    isTargetEqualsInputSearch( $event ) {
        return $event.target === this.input.element.nativeElement;
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
