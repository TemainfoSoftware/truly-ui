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
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';

import { style, transition, trigger, animate, state } from '@angular/animations';

import { KeyEvent } from '../core/enums/key-events';
import { IdGeneratorService } from '../core/helper/idgenerator.service';
import { NameGeneratorService } from '../core/helper/namegenerator.service';
import { ComponentHasModelBase } from '../core/base/component-has-model.base';
import { TabIndexService } from '../form/tabIndex.service';
import { MakeProvider } from '../core/base/value-accessor-provider';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';

@Component( {
    selector: 'tl-dropdown-list',
    templateUrl: './dropdownlist.html',
    styleUrls: [ './dropdownlist.scss', './styles/dx-icons.scss'],
    animations: [
        trigger(
            'enterAnimation', [
                state( 'true', style( { opacity : 1, transform : 'translate(0%,0%)' } ) ),
                state( 'false', style( { opacity : 0, transform : 'translate(0%,-5%)', flex : '0' } ) ),
                transition( '1 => 0', animate( '200ms' ) ),
                transition( '0 => 1', animate( '200ms' ) ),
            ]
        )
    ],
    providers : [
        [ MakeProvider(TlDropDownList) ]
    ]
} )

export class TlDropDownList extends ComponentHasModelBase implements AfterViewInit, OnInit, OnDestroy {

    @Input( 'data' ) data: any[] = [];

    @Input( 'value' ) value = 'value';

    @Input( 'text' ) text = 'text';

    @Input( 'icon' ) icon = null;

    @Input( 'label' ) label: string;

    @Input('showOnlyIcon') showOnlyIcon = false;

    @Input( 'disabled' ) disabled = null;

    @Input( 'labelPlacement' ) labelPlacement = 'left';

    @Input( 'labelSize' ) labelSize = '100px';

    @Input( 'height' ) height = '23px';

    @Input( 'preSelected' ) preSelected = '';

    @Input( 'width' ) width = '120px';

    @Input( 'placeholder' ) placeholder = null;

    @Input( 'searchOnList' ) searchOnList = false;

    @Input( 'placeholderIcon' ) placeholderIcon = 'ion-navicon-round';

    @Input( 'scroll' ) scroll = null;

    @ViewChild( 'list' ) list;

    @ViewChild( 'defaultPlaceholder' ) placeholderDiv;

    @ViewChild( 'dropdown' ) dropdown;

    @ViewChild( 'dropdownShow' ) dropdownShow;

    @ViewChild( 'searchInput' ) searchInput;

    @ViewChild( 'wrapper' ) wrapper;

    public zIndex = 0;

    private topPosition = null;

    private leftPosition = '0px';

    private position = 'absolute';

    private showHide = false;

    private children = -1;

    private itemSelected = [];

    private datasource = [];

    private listTopPosition = 0;

    private listLeftPosition = 0;

    private arraylisteners = [];

    private subject = new Subject();

    constructor( private _renderer: Renderer2,
                 public tabIndexService: TabIndexService,
                 public idService: IdGeneratorService,
                 public nameService: NameGeneratorService,
                 private cd: ChangeDetectorRef) {
        super( tabIndexService, idService, nameService );
    }

    ngOnInit() {
        this.setElement( this.dropdown, 'dropdown' );
        this.subject.debounceTime( 200 ).subscribe( searchTextValue => {
            this.handleSearch( searchTextValue );
        } );
    }

    ngAfterViewInit() {
      this.getTopPosition();
      this.validateData();
      this.updateDataSource( this.getData() );
      this.listenerMouseDown();
      this.listenerDocumentScroll();
      this.listenerKeyDown();
      this.handleInitializeValues();
    }

    listenerKeyDown() {
      this._renderer.listen(this.dropdown.nativeElement, 'keydown', ($event) => {
        this.onListClosed($event);
      });
    }

    getTopPosition() {
      this.listLeftPosition = this.element.nativeElement.getBoundingClientRect().left;
      this.listTopPosition = (this.element.nativeElement.getBoundingClientRect().top) + (this.wrapper.nativeElement.offsetHeight);
      this.cd.detectChanges();
    }

    listenerDocumentScroll() {
      this.arraylisteners.push(this._renderer.listen(document, 'scroll', ($event) => {
        this.showHide = false;
      }));
    }

    validateData() {
        if ( ( this.data[ 0 ] === undefined ) ) {
            throw new EvalError( 'You must pass some valid data to the DATA property of the tl-dropdown-list element.' );
        }
        if ( typeof this.data[ 0 ] === 'object' && (this.text === undefined || this.value === undefined) ) {
            throw new EvalError( 'You must pass a string value to the TEXT and VALUE properties of the tl-dropdown-list element.' );
        }
        if ( typeof this.data[ 0 ] === 'string' && (this.text !== 'text' || this.value !== 'value') ) {
            throw new EvalError( 'You should not pass a value to the TEXT and VALUE properties' +
                ' when using the SIMPLEDATA property of the tl-dropdown-list element.' );
        }
    }

    listenerMouseDown() {
        this.arraylisteners.push(this._renderer.listen( document, 'mousedown', ( event ) => {
            if ( this.isNotListDropdown( event ) && !this.isSearchInput( event ) ) {
                this.showHide = false;
                this.cd.markForCheck();
            }
        } ));
    }

    isSearchInput( event ) {
        if ( this.searchInput ) {
            return event.target === this.searchInput.nativeElement;
        }
    }

    onKeyDownSearchInput( $event ) {
        this.subject.next( $event.target.value );
    }

    handleSearch( searchTextValue ) {
        const filter = [];
        this.datasource = this.data.slice();
        this.datasource.filter( ( item ) => {
            if ( (item[ this.text ].substr( 0, searchTextValue.length ).toLowerCase()) === (searchTextValue.toLowerCase()) ) {
                filter.push( item );
            }
        } );
        this.datasource = filter;
    }

    handleInitializeValues() {
        setTimeout( () => {
            if ( this.hasModel() ) {
                this.selectValueModelLoaded();
                this.selectItemListLoaded();
                return;
            }
            this.handlePreSelected();
        }, 1 );
    }

    handlePreSelected() {
        if ( this.preSelected ) {
             this.selectOption( this.datasource[ this.preSelected ], this.preSelected );
        }
    }

    handleFocusSearchInput() {
        if ( this.searchInput ) {
            this.searchInput.nativeElement.focus();
        }
    }

    hasModel() {
        return this.componentModel.model;
    }

    selectValueModelLoaded() {
        this.datasource.forEach( ( item ) => {
            if ( this.componentModel.model === item[ this.value ] ) {
                this.setValueInputAsLabel( item );
                this.itemSelected = item;
            }
        } );
    }

    selectItemListLoaded() {
        for ( let i = 0; i < this.list.nativeElement.children.length; i++ ) {
            if ( this.dropdown.nativeElement.value === this.list.nativeElement.children[ i ].innerHTML.trim() ) {
                this.children = i;
            }
        }
    }

    updateDataSource( data ) {
        data.forEach( ( value ) => {
            Object.keys( value ).forEach( ( value2 ) => {
                if ( (value2 !== this.text) && (value2 !== this.value) && (value2 !== this.icon) ) {
                    throw new EvalError( 'You must pass a valid value to TEXT/VALUE properties.' );
                }
            } );
            this.datasource.push( value );
        } );
    }

    calcHeightItem() {
        if ( this.showHide && !this.disabled ) {
            if ( !this.scroll ) {
                if ( (this.datasource.length > 10) ) {
                    return { 'height' : (10 * parseInt(this.height, 10)) + 'px', 'overflow-y' : 'scroll' };
                }
                return { 'height': 'auto', 'overflow-y': 'visible' };
            }
            this.scroll = this.scroll > this.datasource.length ? this.datasource.length : this.scroll;
            return { 'height': (this.scroll * parseInt(this.height, 10)) + 'px', 'overflow-y': 'scroll' };
        }
    }

    isNotListDropdown(event) {
        if (!event.target.parentElement) {
            return false;
        }
        if ( ( event.target.nodeName !== 'LI') && ( event.target.className.indexOf('-placeholder') < 0 )) {
            if ( (event.target.parentElement.nodeName !== 'LI') && ( event.target.parentElement.className.indexOf('-placeholder') < 0) ) {
                return true;
            }
        }
    }

    onListOpened( $event ) {
        this.getTopPosition();
        switch ( $event.keyCode ) {
            case KeyEvent.ARROWDOWN:
                this.stopPropagationAndPreventDefault( $event );
                this.onArrowDown();
                break;
            case KeyEvent.ARROWUP:
                this.stopPropagationAndPreventDefault( $event );
                this.onArrowUp();
                break;
            case KeyEvent.ENTER:
                $event.stopPropagation();
                this.onEnter( $event );
                break;
            case KeyEvent.ESCAPE:
                this.onEscape( $event );
                break;
            case KeyEvent.SPACE:
                this.stopPropagationAndPreventDefault( $event );
                break;
            case KeyEvent.TAB:
                $event.preventDefault();
                this.onEscape( $event );
                break;
        }
    }

    onListClosed( $event ) {
        this.getTopPosition();
        if ( !this.disabled ) {
            switch ( $event.keyCode ) {
                case KeyEvent.ARROWDOWN:
                    this.onArrowDown();
                    this.stopPropagationAndPreventDefault( $event );
                    break;
                case KeyEvent.ARROWUP:
                    this.onArrowUp();
                    this.stopPropagationAndPreventDefault( $event );
                    break;
                case KeyEvent.ENTER:
                    if ( !this.itemSelected ) {
                        this.changeShowStatus($event);
                    } else {
                        this.onEnter( $event );
                    }
                    break;
                case KeyEvent.SPACE:
                    this.onSpace();
                    this.stopPropagationAndPreventDefault( $event );
                    break;
            }
        }
    }

    stopPropagationAndPreventDefault( $event ) {
        $event.stopPropagation();
        $event.preventDefault();
    }

    onSpace() {
        if ( !this.showHide ) {
            this.showHide = true;
        }
    }

    setInitialChildren() {
        if ( this.children === -1 ) {
            this.children = 0;
        }
    }

    onEscape( $event ) {
        $event.stopPropagation();
        if ( !this.componentModel.model && !this.placeholder ) {
            this.onChangeItem();
        }
        this.showHide = false;
        this.setFocusOnDropdown();
    }

    onEnter( $event ) {
        if ( !this.showHide ) {
            this.handleEventWhileItemSelected( $event );
            this.handleDropdownValueAsNull();
        }
        this.handleAddNewOption();
        this.showHide = false;
        this.setFocusOnDropdown();
    }

    handleEventWhileItemSelected( $event ) {
        if ( this.itemSelected ) {
            $event.preventDefault();
            return;
        }
    }

    handleAddNewOption() {
        if ( !this.hasModel() ) {
            this.onChangeItem();
        }
    }

    handleDropdownValueAsNull() {
        if ( !this.itemSelected || this.placeholder || this.itemSelected === null || this.itemSelected === undefined ) {
            this.showHide = true;
            return;
        }
    }

    onChangeItem() {
        if ( !this.showHide ) {
            this.onShowHideFalse();
            return;
        }
        this.datasource.forEach( ( value ) => {
            if ( (value[ this.text ]).trim() === this.getSelectedItem().textContent.trim() ) {
                this.itemSelected = value;
                this.handleItemSelectedAsNull();
                this.setModelComponent( this.itemSelected[ this.value ] );
                this.setValueInputAsLabel( this.itemSelected );
            }
        } );
    }

    getSelectedItem() {
        for ( let item = 0; item < this.list.nativeElement.children.length; item++ ) {
            if ( this.list.nativeElement.children[ item ].getAttribute( 'class' ).includes( 'selected' ) ) {
                return this.list.nativeElement.children[ item ];
            }
        }
    }

    placeholderEnter( $event ) {
        $event.preventDefault();
        $event.stopPropagation();
        switch ( $event.keyCode ) {
            case KeyEvent.ENTER:
                this.itemSelected = null;
                this.setFocusOnDropdown();
                this.showHide = false;
                break;
            case KeyEvent.ARROWDOWN:
                this.onArrowDown();
                break;
            case KeyEvent.TAB:
                this.onEscape( $event );
                break;
            case KeyEvent.ESCAPE:
                this.onEscape( $event );
                break;
        }
    }

    onShowHideFalse() {
        this.setInitialChildren();
        this.itemSelected = this.datasource[ this.children ];
        this.handleItemSelectedAsNull();
        this.setModelComponent( this.itemSelected[ this.value ] );
        this.setValueInputAsLabel( this.itemSelected );
    }

    handleItemSelectedAsNull() {
        if ( this.itemSelected[ this.value ] === null || this.itemSelected[ this.value ] === '' ) {
            this.clearModelComponent();
        }
    }

    onArrowDown() {
        if ( this.children < this.list.nativeElement.children.length - 1 ) {
            const index = this.children + 1;
            this.children = index;
            this.removeSelectedClass();
            this.handleSelectedAsPlaceholder();
            this.addSelectedClass( index );
            this.onChangeItem();
        }
    }

    addSelectedClass( index ) {
        this._renderer.addClass( this.list.nativeElement.children[ index ], 'selected' );
    }

    removeSelectedClass() {
        for ( let item = 0; item < this.list.nativeElement.children.length; item++ ) {
            if ( this.list.nativeElement.children[ item ].getAttribute( 'class' ).includes( 'selected' ) ) {
                this._renderer.removeClass( this.list.nativeElement.children[ item ], 'selected' );
            }
        }
    }

    onArrowUp() {
        if ( this.placeholder && this.children <= 0 ) {
            this.removeSelectedClass();
            this.addSelectedClassPlaceholder();
            this.children = -1;
            this.itemSelected = null;
            this.clearModelComponent();
            this.dropdown.nativeElement.value = this.placeholder;
            this.setPlaceholderIcon();
        }
        this.handleSelectItemArrowUP();
    }

    handleSelectItemArrowUP() {
        if ( this.children > 0 && this.children !== -1 ) {
            this.removeSelectedClass();
            this.children = this.children - 1;
            this.addSelectedClass( this.children );
            this.onChangeItem();
        }
    }

    changeShowStatus(event) {
        event.stopPropagation();
        this.getTopPosition();
        this.setPositionListItens(event);
        this.showHide = !this.showHide;
        if ( this.disabled ) {
            return;
        }
        if ( !this.showHide ) {
            return;
        }
        this.handleNewSelected();
        this.handleFocusSearchInput();
    }

    handleNewSelected() {
        setTimeout( () => {
            if ( this.children === -1 ) {
                this.children = 0;
                this.addSelectedClass( 0 );
            } else {
                this.removeSelectedClass();
                this.addSelectedClass( this.children );
            }
        }, 0 );
    }

    handleSelectedAsPlaceholder() {
        if (this.placeholderDiv.nativeElement.getAttribute('class').includes('selected')) {
            this.removeSelectedClassPlaceholder();
        }
    }

    addSelectedClassPlaceholder() {
        this._renderer.addClass( this.placeholderDiv.nativeElement, 'selected' );
    }

    removeSelectedClassPlaceholder() {
        this._renderer.removeClass( this.placeholderDiv.nativeElement, 'selected' );
    }

    setPositionListItens(event) {
        if (this.showOnlyIcon) {
            const target = event.path.filter( (value) => {
                return value.className === 'tl-dropdown-list-box';
            });
            this.topPosition = event.clientY + ( target[0].offsetHeight - event.layerY) + 'px' ;
            this.leftPosition = event.clientX  - event.layerX  + 'px';
            this.position = 'fixed';
        }
    }

    selectOption( item, index ) {
        this.showHide = false;
        this.itemSelected = item;
        this.children = index;
        this.setModelComponent( item[ this.value ] );
        this.setValueInputAsLabel( item );
        this.dropdown.nativeElement.focus();
    }

    selectPlaceholder() {
        this.showHide = false;
        this.dropdown.nativeElement.value = this.placeholder;
        this.setPlaceholderIcon();
        this.clearModelComponent();
        this.placeholderDiv.nativeElement.focus();
        this.itemSelected = null;
        this.setFocusOnDropdown();
        this.children = -1;
    }

    setValueInputAsLabel( item ) {
        setTimeout( () => {
            this.dropdown.nativeElement.value = item[ this.text ];
            this.setIconClass( item[ this.icon ] );
        }, 0 );
    }

    setIconClass(item) {
        if (this.showOnlyIcon) {
            const classList = item.split(' ');
            this._renderer.removeAttribute(this.dropdownShow.nativeElement, 'class');
            if (classList.length > 0) {
                classList.forEach((value) => {
                    this._renderer.addClass(this.dropdownShow.nativeElement, value);
                });
                return;
            }
            this._renderer.addClass(this.dropdownShow.nativeElement, item);
        }
    }

    setModelComponent( value ) {
        this.writeValue( value );
    }

    clearModelComponent() {
        this.writeValue( '' );
    }

    getData() {
        if ( typeof this.data[ 0 ] === 'string' ) {
            const simpleData = [];
            this.data.forEach( ( value ) => {
                simpleData.push( { text : value, value : value } );
            } );
            return simpleData;
        }
        return this.data;
    }

    setFocusOnDropdown() {
        this.dropdown.nativeElement.focus();
    }

    setPlaceholderIcon() {
        if (this.showOnlyIcon) {
            this.setIconClass(this.placeholderIcon);
        }
    }

    ngOnDestroy() {
      this.arraylisteners.forEach((listener) => listener());
    }

}
