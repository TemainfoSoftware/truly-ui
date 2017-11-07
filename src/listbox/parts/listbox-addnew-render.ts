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

 import { TlListBox } from '../listbox';
import { ChangeDetectorRef, ElementRef, Injectable, NgZone, Renderer2 } from '@angular/core';
import { ListBoxDataSourceService } from '../services/listbox-datasource.service';

@Injectable()
export class AddNewRenderService {

    private listBox;

    private addNewElement;

    private spanAddNewLabel;

    private spanAddNewIcon;

    constructor( public renderer: Renderer2, public change: ChangeDetectorRef, public zone: NgZone,
                 private dataService: ListBoxDataSourceService ) {
    }

    setInstanceListBox(listbox: TlListBox) {
        this.listBox = listbox;
    }

    createAddNew() {
        this.createElementAddNew();
        this.createSpanAddNew();
        this.createSpanIconAddNew();
        this.createListenerClickAddNew();
        this.renderer.appendChild( this.listBox.listBox.nativeElement, this.addNewElement.nativeElement );
    }

    createElementAddNew() {
        this.addNewElement = new ElementRef( this.renderer.createElement( 'li' ) );
        this.renderer.setAttribute( this.addNewElement.nativeElement, 'data-indexnumber',
            String( ((this.dataService.datasource.length + 1) + this.listBox.skip) ) );
        this.renderer.setAttribute( this.addNewElement.nativeElement, 'tabindex', '-1' );
        this.renderer.addClass( this.addNewElement.nativeElement, 'item' );
        this.renderer.addClass( this.addNewElement.nativeElement, 'addNew' );
        this.setStyleAddNew();
    }

    setStyleAddNew() {
        this.renderer.setStyle( this.addNewElement.nativeElement, 'top',
            ((this.dataService.datasource.length) + this.listBox.skip) * this.listBox.rowHeight + 'px' );
        this.renderer.setStyle( this.addNewElement.nativeElement, 'line-height', (this.listBox.rowHeight) - 2 + 'px' );
        this.renderer.setStyle( this.addNewElement.nativeElement, 'height', (this.listBox.rowHeight) - 2 + 'px' );
        this.renderer.setStyle( this.addNewElement.nativeElement, 'cursor', 'pointer' );
        this.renderer.setStyle( this.addNewElement.nativeElement, 'color', '#7a838b' );
        this.renderer.setStyle( this.addNewElement.nativeElement, 'position', 'absolute');
        this.renderer.setStyle( this.addNewElement.nativeElement, 'width', '100%');
        this.renderer.setStyle( this.addNewElement.nativeElement, 'background', '#ffe4c4');
    }

    createSpanAddNew() {
        this.spanAddNewLabel = new ElementRef( this.renderer.createElement( 'span' ) );
        this.renderer.setStyle( this.spanAddNewLabel.nativeElement, 'font-size', this.listBox.labelSize );
        this.renderer.setStyle( this.spanAddNewLabel.nativeElement, 'padding-left', '10px' );
        this.spanAddNewLabel.nativeElement.append( this.listBox.addNewMessage );
        this.renderer.appendChild( this.addNewElement.nativeElement, this.spanAddNewLabel.nativeElement );
    }

    createSpanIconAddNew() {
        this.spanAddNewIcon = new ElementRef( this.renderer.createElement( 'i' ) );
        this.renderer.addClass( this.spanAddNewIcon.nativeElement, 'ion-ios-plus-outline' );
        this.renderer.appendChild( this.spanAddNewLabel.nativeElement, this.spanAddNewIcon.nativeElement );
        this.setStyleAddIconNew();
    }

    setStyleAddIconNew() {
        this.renderer.setStyle(this.spanAddNewIcon.nativeElement, 'padding', '0 0px');
        this.renderer.setStyle(this.spanAddNewIcon.nativeElement, 'float', 'left');
        this.renderer.setStyle(this.spanAddNewIcon.nativeElement, 'padding-left', '10px');
        this.renderer.setStyle(this.spanAddNewIcon.nativeElement, 'height', '10px');
        this.renderer.setStyle(this.spanAddNewIcon.nativeElement, 'font-size', '1.5em');
    }

    createListenerClickAddNew() {
        this.zone.run( () => {
            this.addNewElement.nativeElement.addEventListener( 'click', ( $event: MouseEvent ) => {
                $event.preventDefault();
                $event.stopPropagation();
                this.listBox.handleClickAddNew();
            } );
        } );
    }

    handleAddNewSelected() {
        if (this.listBox.addNew) {
            if (this.addNewElement.nativeElement.className.includes('selected')) {
                this.listBox.handleClickAddNew();
            }
        }
    }
}
