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
    ChangeDetectionStrategy,
} from '@angular/core';

let nextInputUniqueId = 0;
let nextListUniqueId = 0;

@Component( {
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'tl-multiselect',
    templateUrl: './multiselect.html',
    styleUrls: [ './multiselect.scss' ]
} )
export class TlMultiselect implements OnInit {
    @Input() color: string;

    /**
     * Array de Objetos que é utilizado na listagem dos dados
     */
    @Input() data: any[] = [];

    /**
     * Chave a qual ira ser realizada a pesquisa
     */
    @Input() query: string;

    @Input() label: string;
    @Input() detail: string;
    @Input() placeholder: string;
    @Input() icon: string;
    @Input() showIcon = true;
    @Input() openFocus = false;
    @Input() detailOnTag = null;
    @Input() selectTag: number;
    @Input() itemHeight = 10;
    @Input() itemAmount = 5;
    @Input() minLengthSearch = 2;
    @Input() inputID = `input-truly-select-${nextInputUniqueId++}`;
    @Input() listID = `list-truly-select-${nextListUniqueId++}`;

    @Output() getSelecteds: EventEmitter<any> = new EventEmitter();

    @ViewChild( 'input' ) input;
    @ViewChild( 'ul' ) ul;

    public isOpen = 'none';
    public filtredItens: any[] = [];
    private children = -1;
    private placeholderMessage: string;
    private tags: any[] = [];


    constructor() {

    }

    ngOnInit() {
        this.placeholderMessage = this.placeholder;
        this.setFiltredItens();
        this.validationProperty();
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
    }

    setFiltredItens() {
        if ( !(this.tags.length > 0) ) {
            this.filtredItens = this.data;
        }
    }

    toogleOpen( opened: string ) {
        this.isOpen = opened;
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
        if ( this.openFocus ) {
            this.toogleOpen( 'block' );
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

    /**
     * Remove uma TAG do input ao precionar BACKSPACE
     *
     * @param {KeyboardEvent} $event The target to process see
     * @param {KeyboardEvent} $event2 The target2 to process see
     *
     * @example
     * This is a good example
     * processTarget('yo')
     */
    removeTagOnBackspace( $event ) {
        if ( $event === 'Backspace' && this.input.nativeElement.value === '' && this.tags.length > 0 ) {
            this.removeTag( this.tags.length - 1 );
            this.receiveFocus();
        } else {
            this.setFiltredItens();
        }
    }

    closeFilterOnEscape( $event ) {
        if ( $event.code === 'Escape' ) {
            this.toogleOpen( 'none' );
        }
    }

    removeTag( index, item? ) {
        if ( item ) {
            this.filtredItens.push( item );
        } else {
            this.filtredItens.push( this.tags[ index ] );
        }
        this.tags.splice( index, 1 );
        this.getSelecteds.emit( this.tags );
        this.changePlaceholder();
        this.inputSetFocus();
    }

    selectTagClick( event, index, item? ) {
        if ( item.selected === true ) {
            item.selected = false;
        } else if ( event.ctrlKey ) {
            this.selectTagCtrlBindClick( item );
        } else {
            this.cleanTagSelected();
            item[ 'selected' ] = true;
        }
    }

    selectTagCtrlBindClick( item ) {
        item[ 'selected' ] = true;
        this.inputSetFocus();
    }

    selectTagNavitation( keycode ) {
        this.cleanTagSelected();
        if ( keycode === 'ArrowRight' && this.selectTag !== this.tags.length - 1 ) {
            this.selectTag++;
            this.tags[ this.selectTag ][ 'selected' ] = true;
        } else if ( keycode === 'ArrowLeft' && this.selectTag !== 0 && this.tags.length !== 0 ) {
            this.selectTag--;
            this.tags[ this.selectTag ][ 'selected' ] = true;
        }
    }


    changePlaceholder() {
        if ( this.tags.length === 0 ) {
            this.placeholder = this.placeholderMessage;
        }
    }

    addTag( index, item ) {
        this.tags.push( item );
        this.placeholder = '';
        this.children = -1;
        this.getSelecteds.emit( this.tags );
        this.selectTag = this.tags.length;
        this.cleanTagSelected();
        this.inputSetFocus();
        this.cleanInput();
        this.receiveFocus();
    }

    inputKeyDown( event, index, item ) {
        if ( event === 'Enter' && item !== undefined ) {
            this.addTag( index, item );
        }
        if ( event === 'ArrowDown' ) {
            this.toogleOpen( 'block' );
            this.arrowDown();
        }
        if ( event === 'ArrowUp' && this.ul.nativeElement.children.length !== 0 ) {
            this.arrowUp();
        }
        if ( event === 'Delete' ) {
            this.deleteTagSelected();
        }
        if ( event === 'Backspace' ) {
            this.removeTagOnBackspace( event );
            this.receiveFocus();
        }
        if ( event === 'Tab' ) {
            this.toogleOpen( 'none' );
        }
        if ( event === 'ArrowLeft' || event === 'ArrowRight' && this.tags.length !== 0 ) {
            this.selectTagNavitation( event );
        }
    }

    deleteTagSelected() {
        this.tags = this.tags.filter( function ( value ) {
            return !value.selected;
        } );
        this.selectTag = this.tags.length - 1;
        this.receiveFocus();
    }

    arrowDown() {
        if ( this.children < this.ul.nativeElement.children.length - 1 ) {
            this.ul.nativeElement.children[ this.children + 1 ].focus();
            this.children = this.children + 1;
        }
    }

    arrowUp() {
        if ( this.children !== 0 && this.children !== -1 ) {
            this.ul.nativeElement.children[ this.children - 1 ].focus();
            this.children = this.children - 1;
        } else {
            this.inputSetFocus();
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

    inputSetFocus() {
        this.input.nativeElement.focus();
    }

    cleanInput() {
        this.input.nativeElement.value = '';
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
}

