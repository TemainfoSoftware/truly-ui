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
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
    ChangeDetectionStrategy, Renderer2, OnDestroy, forwardRef, ChangeDetectorRef, AfterViewInit,
} from '@angular/core';
import { ComponentHasModelBase } from '../core/base/component-has-model.base';
import { TabIndexService } from '../form/tabIndex.service';
import { NameGeneratorService } from '../core/helper/namegenerator.service';
import { IdGeneratorService } from '../core/helper/idgenerator.service';
import { KeyEvent } from '../core/enums/key-events';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import set = Reflect.set;


@Component( {
    selector: 'tl-multiselect',
    templateUrl: './multiselect.html',
    styleUrls: [ './multiselect.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef( () => TlMultiSelect ), multi: true }
    ]
} )
export class TlMultiSelect extends ComponentHasModelBase implements OnInit, AfterViewInit, OnDestroy {
    @Input() color: string;

    @Input() data: any[] = [];

    @Input() query: string;

    @Input() label: string;

    @Input() detail: string;

    @Input() icon: string;

    @Input() showIcon = true;

    @Input() openFocus = false;

    @Input() detailOnTag = null;

    @Input() selectTag: number;

    @Input() itemHeight = 10;

    @Input() itemAmount = 5;

    @Input() minLengthSearch = 2;

    @Output() getSelecteds: EventEmitter<any> = new EventEmitter();

    @ViewChild( 'input' ) input;

    @ViewChild( 'ul' ) ul;

    public isOpen = 'none';

    public filtredItens: any[] = [];

    private children = -1;

    private placeholderMessage: string;

    private documentListener;

    private tags: any[] = [];

    constructor( tabIndexService: TabIndexService, idService: IdGeneratorService, nameService: NameGeneratorService,
                 private renderer: Renderer2, private change: ChangeDetectorRef ) {
        super( tabIndexService, idService, nameService );
    }

    ngOnInit() {
        this.placeholderMessage = this.placeholder;
        this.setFiltredItens();
        this.validationProperty();
        this.setElement( this.input, 'multiselect' );
        this.createDocumentListener();
    }

    ngAfterViewInit() {
        this.validateHasModel();
    }

    createDocumentListener() {
        this.documentListener = this.renderer.listen( document, 'mousedown', ( $event ) => {
            this.isOpen = 'block';
            if ( $event.target !== document.activeElement && $event.target.nodeName !== 'LI') {
                this.isOpen = 'none';
            }
        } );
    }

    validateHasModel() {
        setTimeout( () => {
            if ( this.componentModel.model ) {
                this.tags = this.componentModel.model;
                this.cleanInput();
                this.change.detectChanges();
                this.receiveFocus();
            }
        }, 1 );
    }

    validationProperty() {
        if ( !this.icon ) {
            this.showIcon = false;
        }
        if ( this.data === undefined || this.query === undefined ) {
            throw new Error( 'The property [data] and property [query] are Required ' + '' +
                'Example : ' + '<tl-multiselect [data]="source" [query]="name"' );
        }
        if ( !this.label ) {
            this.label = this.query;
        }
        if ( this.detail === undefined && this.detailOnTag !== null ) {
            throw new Error( 'You have to declare the [detail] property' );
        }
        if ( this.openFocus ) {
            this.toogleOpen( 'block' );
        }
    }

    setFiltredItens() {
        if ( !(this.tags.length > 0) ) {
            this.filtredItens = this.data;
        }
    }

    toogleOpen( opened: string ) {
        this.isOpen = opened;
        this.setInputFocus();
    }

    receiveFocus() {
        const self = this;
        this.children = -1;
        if ( this.tags.length > 0 ) {
            this.tags.forEach( function ( tag ) {
                self.filtredItens = self.data.filter( function ( value ) {
                    return ((value.source !== tag.source) && ( self.tags.indexOf( value ) < 0 ));
                } );
            } );
        }
    }

    searchItem( inputed, $event ) {
        const self = this;
        this.closeFilterOnEscape( $event );
        if ( inputed.length >= this.minLengthSearch ) {
            this.toogleOpen( 'block' );
            if ( !(this.tags.length > 0) ) {
                this.filtredItens = this.data.filter( function ( valor ) {
                    return valor.source[ self.query ].toString().toUpperCase().includes( inputed.toUpperCase().trim() );
                } );
            } else {
                this.filtredItens = this.filtredItens.filter( function ( valor ) {
                    return valor.source[ self.query ].toString().toUpperCase().includes( inputed.toUpperCase().trim() );
                } );
            }
        }
    }

    removeTagOnBackspace() {
        if ( this.input.nativeElement.value === '' && this.tags.length > 0 ) {
            this.removeTag( this.tags.length - 1 );
            this.receiveFocus();
        } else {
            this.setFiltredItens();
        }
    }

    closeFilterOnEscape( $event ) {
        if ( $event.keyCode === KeyEvent.ESCAPE ) {
            this.toogleOpen( 'none' );
        }
    }

    removeTag( index, item? ) {
        item ? this.filtredItens.push( item ) : this.filtredItens.push( this.tags[ index ] );
        this.tags.splice( index, 1 );
        this.getSelecteds.emit( this.tags );
        this.changePlaceholder();
        this.setInputFocus();
    }

    selectTagClick( event, item? ) {
        if ( item.selected === true ) {
            item.selected = false;
        } else if ( event.ctrlKey ) {
            this.selectTagCtrlBindClick( item );
        } else {
            this.cleanTagSelected();
            item[ 'selected' ] = true;
        }
        this.setInputFocus();
    }

    selectTagCtrlBindClick( item ) {
        item[ 'selected' ] = true;
        this.setInputFocus();
    }

    selectTagNavitation( keycode ) {
        this.cleanTagSelected();
        if ( keycode === KeyEvent.ARROWRIGHT && this.selectTag !== this.tags.length - 1 ) {
            this.selectTag++;
            this.tags[ this.selectTag ][ 'selected' ] = true;
        } else if ( keycode === KeyEvent.ARROWLEFT && this.selectTag !== 0 && this.tags.length !== 0 ) {
            this.selectTag--;
            this.tags[ this.selectTag ][ 'selected' ] = true;
        }
    }


    changePlaceholder() {
        if ( this.tags.length === 0 ) {
            this.placeholder = this.placeholderMessage;
        }
    }

    addTag( item ) {
        this.tags.push( item );
        this.modelValue = this.tags;
        this.placeholder = '';
        this.children = -1;
        this.selectTag = this.tags.length;
        this.getSelecteds.emit( this.tags );
        this.cleanTagSelected();
        this.receiveFocus();
        this.setInputFocus();
        this.change.detectChanges();
        this.cleanInput();
    }

    handleKeyDown( $event, item ) {
        switch ( $event.keyCode ) {
            case KeyEvent.ENTER:
                if (item !== undefined) {
                    this.addTag( item );
                }
                break;
            case KeyEvent.ARROWDOWN:
                $event.preventDefault();
                this.toogleOpen( 'block' );
                this.handleArrowDown();
                break;
            case KeyEvent.ARROWUP:
                $event.preventDefault();
                this.handleArrowUp();
                break;
            case KeyEvent.DELETE:
                this.deleteTagSelected();
                break;
            case KeyEvent.BACKSPACE:
                this.removeTagOnBackspace();
                this.receiveFocus();
                break;
            case KeyEvent.TAB:
                this.toogleOpen( 'none' );
                break;
            case KeyEvent.ARROWLEFT || KeyEvent.ARROWRIGHT && this.tags.length !== 0:
                this.selectTagNavitation( $event.keyCode );
                break;
        }
    }

    deleteTagSelected() {
        this.tags = this.tags.filter( function ( value ) {
            return !value.selected;
        } );
        this.selectTag = this.tags.length - 1;
        this.receiveFocus();
    }

    handleArrowDown() {
        if ( this.children < this.ul.nativeElement.children.length - 1 ) {
            this.ul.nativeElement.children[ this.children + 1 ].focus();
            this.children = this.children + 1;
        }
    }

    handleArrowUp() {
        if ( this.children !== 0 && this.children !== -1 ) {
            this.ul.nativeElement.children[ this.children - 1 ].focus();
            this.children = this.children - 1;
        } else {
            this.setInputFocus();
        }
    }

    calcHeightItem() {
        if ( this.itemAmount >= this.filtredItens.length ) {
            return { 'height': 'auto' };
        } else {
            return { 'height': (this.itemHeight * 3.6) * this.itemAmount + 'px' };
        }
    }

    changeColorTag( tag ) {
        if ( this.color !== undefined ) {
            if ( !tag.selected ) {
                return { 'background': tag.effect.color };
            }
            return { 'background': tag.effect.color, 'opacity': 0.8 };
        } else {
            if ( tag.selected ) {
                return { 'background': '#66CC99', 'opacity': 0.8 };
            }
            return { 'background': '#66CC99' };
        }
    }

    setInputFocus() {
        this.input.nativeElement.focus();
    }

    cleanInput() {
        setTimeout( () => {
            this.input.nativeElement.value = '';
        }, 1 );
    }

    cleanTagSelected() {
        this.tags.forEach( function ( value ) {
            value.selected = false;
        } );
    }

    hasTag() {
        return this.tags.length === 0;
    }

    close( event ) {
        if ( event.relatedTarget === null ) {
            this.toogleOpen( 'none' );
        }
    }

    ngOnDestroy() {
        this.documentListener();
    }
}

