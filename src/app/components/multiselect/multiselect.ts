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
    ChangeDetectionStrategy, Renderer2, OnDestroy, ChangeDetectorRef, AfterViewInit,
} from '@angular/core';
import { ComponentHasModelBase } from '../core/base/component-has-model.base';
import { TabIndexService } from '../form/tabIndex.service';
import { NameGeneratorService } from '../core/helper/namegenerator.service';
import { IdGeneratorService } from '../core/helper/idgenerator.service';
import { KeyEvent } from '../core/enums/key-events';
import { MakeProvider } from '../core/base/value-accessor-provider';


@Component( {
    selector: 'tl-multiselect',
    templateUrl: './multiselect.html',
    styleUrls: [ './multiselect.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        [ MakeProvider(TlMultiSelect) ]
    ]
} )
export class TlMultiSelect extends ComponentHasModelBase implements OnInit, AfterViewInit, OnDestroy {

    @Input() color: string;

    @Input() data = [];

    @Input() query: string;

    @Input() label: string;

    @Input() labelSize = '120px';

    @Input() labelTag: string;

    @Input() detail: string;

    @Input() icon: string;

    @Input() defaultColorTag = '#66CC99';

    @Input() defaultIconTag = null;

    @Input() openFocus = true;

    @Input() detailOnTag = null;

    @Input() itemHeight = 10;

    @Input() itemAmount = 5;

    @Input() minLengthSearch = 2;

    @Input() selectedFontColor = '#fff';

    @Input() selectedBackgroundColor = '#66CC99';

    @Input() sortAlphabetically = false;

    @Output() getSelecteds: EventEmitter<any> = new EventEmitter();

    @Output() onClickTag: EventEmitter<any> = new EventEmitter();

    @Output() onRemoveTag: EventEmitter<any> = new EventEmitter();

    @ViewChild( 'input' ) input;

    @ViewChild( 'ul' ) ul;

    @ViewChild( 'element' ) wrapperTags;

    public isOpen = false;

    public filteredItens = [];

    public listPosition;

    public hasKeySource: boolean;

    private showIcon = true;

    private cursor = -1;

    private selectTag: number;

    private placeholderMessage: string;

    private documentListener;

    private tags = [];

    private dataSource = [];

    constructor( tabIndexService: TabIndexService, idService: IdGeneratorService, nameService: NameGeneratorService,
                 private renderer: Renderer2, private change: ChangeDetectorRef ) {
        super( tabIndexService, idService, nameService );
    }

    ngOnInit() {
        this.placeholderMessage = this.placeholder;
        this.dataSource = this.data;
        this.validateKeySource();
        this.setFilteredItens();
        this.validationProperty();
        this.setElement( this.input, 'multiselect' );
        this.createDocumentListener();
    }

    ngAfterViewInit() {
        this.validateHasModel();
    }

    validateKeySource() {
        this.dataSource[0].source ? this.hasKeySource = true : this.hasKeySource = false;
    }

    createDocumentListener() {
        this.documentListener = this.renderer.listen( document, 'mousedown', ( $event ) => {
            this.toogleOpen( true );
            if ( !this.isTargetElementEqualActiveElement( $event ) && !this.isTargetNodeNameEqualLi( $event ) ) {
                this.toogleOpen( false );
            }
        } );
    }

    isTargetElementEqualActiveElement( $event ) {
        return $event.target === document.activeElement;
    }

    isTargetNodeNameEqualLi( $event ) {
        return $event.target.nodeName === 'LI';
    }

    validateHasModel() {
        setTimeout( () => {
            if ( this.modelValue ) {
                this.handleModelValueAsTags();
                this.cleanInput();
                this.removeElementsForFilter();
                this.change.detectChanges();
            }
        }, 1 );
    }

    handleModelValueAsTags() {
        this.setModelValueWithSourceKey();
        let modeltemp;
        modeltemp = this.modelValue;
        modeltemp.forEach((value, index, array) => {
            this.dataSource.forEach( ( value2, index2, array2 ) => {
                if (JSON.stringify(value) === JSON.stringify(this.getValue(value2))) {
                    this.tags.push(value2);
                }
            });
        });
    }

    setModelValueWithSourceKey() {
       for (let item = 0; item < this.modelValue.length; item++) {
           if (this.modelValue[item].source) {
               return this.tags = this.modelValue;
           }
       }
    }

    sortFilteredItens() {
        if ( this.sortAlphabetically ) {
            this.filteredItens.sort( ( a, b ) => {
                const x = this.getValue(a)[ this.query ].toLowerCase();
                const y = this.getValue(b)[ this.query ].toLowerCase();
                return x < y ? -1 : x > y ? 1 : 0;
            } );
        }
    }

    removeElementsForFilter() {
        this.tags.forEach((value) => {
            this.dataSource.forEach( ( value2, index, array ) => {
                if (JSON.stringify(this.getValue(value)) === JSON.stringify(this.getValue(value2))) {
                    this.dataSource.splice( index, 1 );
                }
            });
        });
        this.filteredItens = this.dataSource;
        this.sortFilteredItens();
    }

    validationProperty() {
        if ( !this.icon ) {
            this.showIcon = false;
        }
        if ( this.data === undefined || this.query === undefined ) {
            throw new Error( 'The property [data] and property [query] are Required ' + '' +
                'Example : ' + '<tl-multiselect [data]="source" [query]="name"' );
        }
        if ( !this.labelTag ) {
            this.labelTag = this.query;
        }
        if ( this.detail === undefined && this.detailOnTag !== null ) {
            throw new Error( 'You have to declare the [detail] property' );
        }
    }

    validateEmptySearch() {
        setTimeout( () => {
            if ( this.input.nativeElement.value === '' && this.isTagsEqualsZero() ) {
                return this.filteredItens = this.dataSource;
            }
        }, 1 );
        this.sortFilteredItens();
    }

    validateOpenOnFocus() {
        if ( this.openFocus ) {
            this.toogleOpen( true );
        }
    }

    validateEventOnKeyEnter( $event ) {
        if ( this.tags.length === 0 ) {
            this.stopEventKeyDown( $event );
            this.setInputFocus();
        }
        this.stopEventKeyDown( $event );
        this.setInputFocus();
    }

    addTagOnKeyEnter() {
        for ( let element = 0; element < this.ul.nativeElement.children.length; element++ ) {
            if ( this.ul.nativeElement.children[ element ].className.includes( 'selected' ) ) {
                return this.addTag( this.filteredItens[ element ] );
            }
        }
    }

    removeAllSelectedClasses() {
        for ( let element = 0; element < this.ul.nativeElement.children.length; element++ ) {
            if ( this.ul.nativeElement.children[ element ].className.includes( 'selected' ) ) {
                this.removeClassSelected( element );
            }
        }
    }

    handleKeyDown( $event ) {
        this.activeInputText();
        switch ( $event.keyCode ) {
            case KeyEvent.ENTER:
                this.handleKeyEnter( $event );
                break;
            case KeyEvent.ARROWDOWN:
                if ( this.isOpen ) {
                    this.stopEventKeyDown( $event );
                }
                this.toogleOpen( true );
                this.handleArrowDown();
                break;
            case KeyEvent.ARROWUP:
                if ( this.isOpen ) {
                    this.stopEventKeyDown( $event );
                }
                this.handleArrowUp();
                break;
            case KeyEvent.DELETE:
                this.handleKeyDelete( $event );
                break;
            case KeyEvent.BACKSPACE:
                this.handleKeyBackspace();
                break;
            case KeyEvent.TAB:
                this.toogleOpen( false );
                break;
            case KeyEvent.ARROWLEFT:
                this.stopEventKeyDown( $event );
                if (!this.isTagsEqualsZero()) {
                    this.handleArrowLeft();
                }
                break;
            case KeyEvent.ARROWRIGHT:
                this.stopEventKeyDown($event);
                if (!this.isTagsEqualsZero()) {
                    this.handleArrowRight();
                }
                break;
            case KeyEvent.ESCAPE:
                if ( this.isOpen ) {
                    this.stopEventKeyDown( $event );
                    this.toogleOpen( false );
                }
                break;
        }
    }

    handleKeyEnter( $event ) {
        if ( this.isOpen ) {
            this.validateEventOnKeyEnter( $event );
            this.addTagOnKeyEnter();
            this.addClassSelected( 0 );
            this.cursor = 0;
        }
    }

    handleKeyDelete( $event ) {
        this.stopEventKeyDown( $event );
        this.deleteTagSelected();
        this.removeAllSelectedClasses();
        this.addClassSelected( 0 );
        this.cursor = 0;
    }

    handleKeyBackspace() {
        this.removeAllSelectedClasses();
        this.removeTagOnBackspace();
        this.addClassSelected( 0 );
        this.cursor = 0;
    }

    activeInputText() {
        this.input.nativeElement.style.webkitTextFillColor = 'rgb(202, 202, 202)';
    }

    deActiveInputText() {
      if (this.isOpen) {
        this.input.nativeElement.style.webkitTextFillColor = 'transparent';
      }
    }

    handleArrowRight() {
        this.cleanTagSelected();
        if (this.selectTag !== this.tags.length - 1) {
            this.selectTag++;
            this.setSelectTagAsTrue();
        }
    }

    handleArrowLeft() {
        this.cleanTagSelected();
        if (this.selectTag !== 0 && this.tags.length !== 0) {
            this.selectTag--;
            this.setSelectTagAsTrue();
        }
    }

    handleArrowDown() {
        if ( !this.isOpen ) {
            return;
        }
        if ( this.cursor < this.ul.nativeElement.children.length - 1 ) {
            this.setFocusOnNextElement();
            this.cursor = this.cursor + 1;
        }
    }

    handleArrowUp() {
        if ( !this.isOpen ) {
            return;
        }
        if ( !this.isChildrenEqualsZero() && !this.isChildrenEqualsNegativeOne() ) {
            this.setFocusOnPreviousElement();
            this.cursor = this.cursor - 1;
        } else {
            this.setInputFocus();
        }
    }

    handleInputFocus() {
        this.validateOpenOnFocus();
        this.setOutlineMultiSelect();
        this.deActiveInputText();
        this.sortFilteredItens();
        this.listPosition = this.element.nativeElement.getBoundingClientRect() - 5;
        this.change.detectChanges();
    }

    setFilteredItens() {
        this.validateEmptySearch();
        if ( !this.isTagsLengthMoreThanZero() ) {
            if ( this.isFilteredLengthEqualsDataLength() ) {
                this.filteredItens = this.dataSource;
                this.sortFilteredItens();
            }
        }
    }

    toogleOpen( opened ) {
        this.isOpen = opened;
    }

    removeTagOfFilter( tag? ) {
        this.cursor = -1;
        this.filteredItens.forEach( ( item, index, array2 ) => {
            if (JSON.stringify(this.getValue(tag)) === JSON.stringify(this.getValue(item))) {
                this.filteredItens.splice( index, 1 );
            }
        });
        this.sortFilteredItens();
    }

    getValue(value) {
        return this.hasKeySource ? value.source : value;
    }

    setOutlineMultiSelect() {
        if ( this.wrapperTags ) {
            this.wrapperTags.nativeElement.style.background = '#fffbe9';
            this.wrapperTags.nativeElement.style.border = '1px solid #ffcf94';
        }
    }

    setSelectTagAsTrue() {
        this.tags[ this.selectTag ][ 'selected' ] = true;
    }

    setInputFocus() {
        this.input.nativeElement.focus();
        this.cursor = -1;
    }

    setFocusOnNextElement() {
        const nextCursor = this.cursor + 1;
        if ( this.cursor >= 0 ) {
            this.removeClassSelected( this.cursor );
        }
        this.addClassSelected( nextCursor );
    }

    setFocusOnPreviousElement() {
        const previousCursor = this.cursor - 1;
        if ( this.cursor >= 0 ) {
            this.removeClassSelected( this.cursor );
        }
        this.addClassSelected( previousCursor );
    }

    addClassSelected( index ) {
      if (this.existChildren()) {
        this.renderer.addClass( this.ul.nativeElement.children[ index ], 'selected' );
        this.filteredItens[index].selected = true;
        this.change.detectChanges();
      }
    }

    removeClassSelected( index ) {
      if (this.existChildren()) {
        this.renderer.removeClass( this.ul.nativeElement.children[ index ], 'selected' );
        this.filteredItens[index].selected = false;
        this.change.detectChanges();
      }
    }

    existChildren() {
      return this.ul.nativeElement.children.length > 0;
    }

    addTag( item ) {
        this.tags.push( item );
        this.placeholder = '';
        this.selectTag = this.tags.length;
        this.getSelecteds.emit( this.tags );
        this.setModelValue();
        this.cleanTagSelected();
        this.removeTagOfFilter(item);
        this.removeElementsForFilter();
        this.setInputFocus();
        this.cleanInput();
        this.toogleOpen( true );
        this.change.detectChanges();
        this.handleSelectTagOnFirst();
    }

    handleSelectTagOnFirst() {
        if ( this.ul.nativeElement.children[ 0 ] ) {
            this.addClassSelected( 0 );
            this.cursor = 0;
        }
    }

    stopEventKeyDown( $event ) {
        $event.preventDefault();
        $event.stopPropagation();
    }

    setModelValue() {
        const modeltemp = [];
        this.tags.forEach((value, index, array) => {
           modeltemp.push(this.getValue(value));
        });
        this.modelValue = modeltemp;
    }

    deleteTagSelected() {
        this.addTagSelectedToFiltered();
        this.filterTagsNotSelected();
        this.sortFilteredItens();
        this.selectTag = this.tags.length - 1;
    }

    addTagSelectedToFiltered() {
        this.tags.forEach((value, index, array) => {
            if (value.selected) {
                this.filteredItens.push( value );
            }
        });
    }

    filterTagsNotSelected() {
        this.tags = this.tags.filter( function ( value ) {
            return !value.selected;
        } );
    }


    searchItem( inputed, $event ) {
        this.closeFilterOnEscape( $event );
        if ( this.isValueMoreOrEqualThanMinLengthSearch(inputed)  ) {
            this.toogleOpen( true );
            !this.isTagsLengthMoreThanZero() ? this.filterOfData( inputed ) : this.filterOfFilteredItens( inputed );
        } else {
            this.removeElementsForFilter();
        }
        this.setNewSelected( inputed );
    }

    setNewSelected( value ) {
        if ( value ) {
            this.removeAllSelectedClasses();
            this.addClassSelected( 0 );
            this.cursor = 0;
        }
    }


    filterOfData(inputed) {
        this.filteredItens = this.dataSource.filter( ( value ) => {
            return this.getValue(value)[ this.query ].toString().toUpperCase().includes( inputed.toUpperCase().trim() );
        } );
    }

    filterOfFilteredItens( inputed ) {
        this.filteredItens = this.filteredItens.filter( ( value ) => {
            return this.getValue(value)[ this.query ].toString().toUpperCase().includes( inputed.toUpperCase().trim() );
        } );
    }

    isValueMoreOrEqualThanMinLengthSearch(value) {
        return value.length >= this.minLengthSearch;
    }

    selectTagCtrlBindClick( item ) {
        item.selected = true;
        this.setInputFocus();
    }

    selectTagClick( event, item? ) {
        this.onClickTag.emit( item );
        if (item.selected) {
            return item.selected = false;
        }
        if (event.ctrlKey) {
            return this.selectTagCtrlBindClick( item );
        }
        this.cleanTagSelected();
        item.selected = true;
        this.setInputFocus();
    }

    calcHeightWidthItem() {
        if ( this.itemAmount >= this.filteredItens.length ) {
            return { 'height': 'auto', 'width': this.wrapperTags.nativeElement.offsetWidth + 'px' };
        } else {
            return { 'height': (this.itemHeight * 3.6) * this.itemAmount + 'px',
                'width': this.wrapperTags.nativeElement.offsetWidth + 'px' };
        }
    }

    changeColorTag( tag ) {
        if ( (this.color) && (tag.effect)) {
            if ( !tag.selected ) {
                return { 'background': tag.effect[this.color] };
            }
            return { 'background': tag.effect[this.color], 'opacity': 0.8 };
        } else {
            if ( tag.selected ) {
                return { 'background': this.defaultColorTag, 'opacity': 0.8 };
            }
            return { 'background': this.defaultColorTag };
        }
    }

    changePlaceholder() {
        if ( this.tags.length === 0 ) {
            this.placeholder = this.placeholderMessage;
        }
    }

    removeTagOnBackspace() {
        if ( this.isInputValueEqualsEmpty() && this.isTagsLengthMoreThanZero() ) {
            this.removeTag( this.tags.length - 1 );
            this.setInputFocus();
        } else {
            this.setFilteredItens();
        }
        this.toogleOpen( true );
    }

    removeTag( index, item? ) {
        item ? this.filteredItens.push( item ) : this.filteredItens.push( this.tags[ index ] );
        this.onRemoveTag.emit( item ? item : this.tags[ index ] );
        this.getSelecteds.emit( this.tags );
        this.tags.splice( index, 1 );
        this.changePlaceholder();
        this.setInputFocus();
        this.setModelValue();
        this.sortFilteredItens();
        this.cleanInput();
        this.toogleOpen(true);
        this.change.detectChanges();
        this.handleSelectTagOnFirst();
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

    clearOutlineMultiSelect() {
        if ( this.wrapperTags ) {
            this.wrapperTags.nativeElement.style.background = '#fff';
            this.wrapperTags.nativeElement.style.border = '1px solid #CACACA';
        }
    }

    closeFilterOnEscape( $event ) {
        if ( this.isKeyEventEqualsEscape( $event ) ) {
            this.toogleOpen( false );
        }
    }

    isKeyEventEqualsEscape( $event ) {
        return $event.keyCode === KeyEvent.ESCAPE;
    }

    isTagsEqualsZero() {
        return this.tags.length === 0;
    }

    isChildrenEqualsZero() {
        return this.cursor === 0;
    }

    isChildrenEqualsNegativeOne() {
        return this.cursor === -1;
    }

    isInputValueEqualsEmpty() {
        return this.input.nativeElement.value === '';
    }

    isTagsLengthMoreThanZero() {
        return this.tags.length > 0;
    }

    isFilteredLengthEqualsDataLength() {
        return this.filteredItens.length === this.dataSource.length;
    }

    closeList( event, element ) {
        this.clearOutlineMultiSelect();
        if ( event.relatedTarget === null || (event.relatedTarget as HTMLElement).nodeName !== 'LI' ) {
            this.toogleOpen( false );
        }
    }

    ngOnDestroy() {
        this.documentListener();
        this.change.detach();
    }
}

