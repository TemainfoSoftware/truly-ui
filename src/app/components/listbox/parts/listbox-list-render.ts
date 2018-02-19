/*
 MIT License

 Copyright (c) 2018 Temainfo Software

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

import { TlListBox } from '../listbox';
import { ElementRef, Injectable, NgZone } from '@angular/core';
import { ListBoxDataSourceService } from '../services/listbox-datasource.service';
import { AddNewRenderService } from './listbox-addnew-render';

@Injectable()
export class ListBoxListRenderService {

  private listBox: TlListBox;

  private listElement;

  private spanElementLabel;

  private spanElementId;

  constructor( private dataService: ListBoxDataSourceService,
               private zone: NgZone ) {}

  setInstanceListBox( listbox: TlListBox ) {
    this.listBox = listbox;
  }

  createList() {
    if ( this.dataService.datasource ) {
      requestAnimationFrame( () => {
        this.zone.runOutsideAngular( () => {
          this.listBox.handleRemoveListChildren();
          for ( let row = 0; row < this.dataService.datasource.length; row++ ) {
            this.createElementList( row );
            this.addEventClickToListElement( row );
            this.appendListElementToListBox();
            this.createElementSpanLabel( row );
            this.listBox.renderer.appendChild( this.listElement.nativeElement,
              this.spanElementLabel.nativeElement );
            this.handleCreationIdElement( row );
          }
          this.listBox.handleCreateAddNew();
        } );
        if ( this.listBox.cursor > -1 ) {
          this.listBox.getElementOfList();
        }
      } );
    }
  }

  createElementList( row ) {
    this.listElement = new ElementRef( this.listBox.renderer.createElement( 'li' ) );
    this.listBox.renderer.setAttribute( this.listElement.nativeElement, 'data-indexnumber', String( (row + this.listBox.skip) ) );
    this.listBox.renderer.setStyle( this.listElement.nativeElement, 'top', (row + this.listBox.skip) * this.listBox.rowHeight + 'px' );
    this.listBox.renderer.setStyle( this.listElement.nativeElement, 'position', 'absolute' );
    this.listBox.renderer.setStyle( this.listElement.nativeElement, 'width', '100%' );
    this.listBox.renderer.setStyle( this.listElement.nativeElement, 'height', this.listBox.rowHeight + 'px' );
    this.listBox.renderer.addClass( this.listElement.nativeElement, 'item' );
    this.handleListStripped();
  }

  createElementSpanId( row ) {
    if ( this.isTypeArrayObject() ) {
      const padding = 10;
      this.spanElementId = new ElementRef( this.listBox.renderer.createElement( 'div' ) );
      this.listBox.renderer.setStyle( this.spanElementId.nativeElement, 'font-size', this.listBox.labelSize );
      this.listBox.renderer.setStyle( this.spanElementId.nativeElement, 'height', (this.listBox.rowHeight - padding) + 'px' );
      this.listBox.renderer.setStyle( this.spanElementId.nativeElement, 'float', 'right' );
      this.listBox.renderer.setStyle( this.spanElementId.nativeElement, 'line-height', (this.listBox.rowHeight - padding) + 'px' );
      this.spanElementId.nativeElement.append( this.dataService.datasource[ row ][ this.listBox.id ] );
    }
  }

  createElementSpanLabel( row ) {
    this.spanElementLabel = new ElementRef( this.listBox.renderer.createElement( 'div' ) );
    this.listBox.renderer.setStyle( this.spanElementLabel.nativeElement, 'font-size', this.listBox.labelSize );
    this.listBox.renderer.setStyle( this.spanElementLabel.nativeElement, 'position', 'absolute' );

    const spanLabel = new ElementRef( this.listBox.renderer.createElement( 'span' ) );
    spanLabel.nativeElement.append( this.isTypeArrayObject() ?
      this.listBox.dataService.datasource[ row ][ this.listBox.label ] : this.listBox.dataService.datasource[ row ] );
    this.listBox.renderer.appendChild( this.spanElementLabel.nativeElement, spanLabel.nativeElement );

    this.createElementSpanLabelDetail( row );
    this.handleAlignmentLine();
  }

  handleAlignmentLine() {
    if ( !this.listBox.labelDetail || !this.isTypeArrayObject() ) {
      const padding = 10;
      this.listBox.renderer.setStyle( this.spanElementLabel.nativeElement, 'line-height', (this.listBox.rowHeight - padding) + 'px' );
    }
  }

  createElementSpanLabelDetail( row ) {
    if ( (this.listBox.labelDetail) && (this.isTypeArrayObject()) ) {
      const spanLabelDetail = new ElementRef( this.listBox.renderer.createElement( 'span' ) );
      this.listBox.renderer.setStyle( spanLabelDetail.nativeElement, 'font-size', '0.8em' );
      spanLabelDetail.nativeElement.append( this.dataService.datasource[ row ][ this.listBox.labelDetail ] );
      this.listBox.renderer.appendChild( this.spanElementLabel.nativeElement, spanLabelDetail.nativeElement );
    }
  }

  handleCreationIdElement( row ) {
    if ( (this.listBox.id) && (this.isTypeArrayObject()) ) {
      this.createElementSpanId( row );
      this.listBox.renderer.appendChild( this.listElement.nativeElement, this.spanElementId.nativeElement );
    }
  }


  isTypeArrayObject() {
    return this.listBox.typeOfData === 'object';
  }

  addEventClickToListElement( row ) {
    this.zone.run( () => {
      this.listBox.renderer.listen( this.listElement.nativeElement, 'mousedown', ( $event ) => {
        $event.stopPropagation();
        if ($event.currentTarget.localName === 'li') {
          this.listBox.handleClickItem( this.dataService.datasource[ row ], row,
            this.listElement.nativeElement.getAttribute('data-indexnumber'));
          this.listBox.handleOpenFocusList();
          this.listBox.setInputFocus();
        }
      } );
    } );
  }

  appendListElementToListBox() {
    this.listBox.renderer.appendChild( this.listBox.listBox.nativeElement, this.listElement.nativeElement );
  }


  handleListStripped() {
    if ( this.listBox.listStripped ) {
      this.listBox.renderer.addClass( this.listElement.nativeElement, 'stripped' );
    }
  }
}
