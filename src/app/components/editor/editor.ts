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
import {
  AfterContentInit,
  Component, ElementRef, OnChanges, Renderer2, SimpleChanges, ViewChild,
} from '@angular/core';

@Component( {
  selector: 'tl-editor',
  templateUrl: './editor.html',
  styleUrls: [ './editor.scss' ],
} )

export class TlEditor implements AfterContentInit, OnChanges {

  @ViewChild( 'contentEditor' ) contentEditor;

  @ViewChild( 'linkBox' ) linkBox;

  @ViewChild( 'wrapper' ) wrapper;

  public dataFont = [];

  public dataFontSize = [];

  public font = 'Segoe UI';

  public fontSize = '16';

  public alignment = '';

  public toggleLink = false;

  public toggleImage = false;

  public descriptionLink = '';

  public linkItself = '';

  public colorSelected = '#00000';

  public anchorNodeCursor;

  public cursor = false;

  public selectedContent = false;

  public cursorSelection;

  public contentEditable = true;

  public image = { imageUrl: '', width: 0, height: 0};

  public selection = { start: 0, end: 0, baseNode: null };

  constructor( private renderer: Renderer2 ) {
    this.dataFont = [
      { textItem: 'Arial', value: 'Arial' },
      { textItem: 'Roboto', value: 'Roboto' },
      { textItem: 'Lato', value: 'Lato' },
      { textItem: 'Calibri', value: 'Calibri' },
      { textItem: 'Comic Sans MS', value: 'Comic Sans MS' },
      { textItem: 'Segoe UI', value: 'Segoe UI' },
    ];
    this.dataFontSize = [ '3', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20' ];
  }

  ngAfterContentInit() {
    this.setContentFocus();
  }

  alignContent( align ) {
    this.setContentFocus();
    document.execCommand( align, false, null );
  }

  setAnchorNode() {
    this.anchorNodeCursor = document.getSelection();
    this.selection[ 'start' ] = this.anchorNodeCursor.baseOffset;
    this.selection[ 'end' ] = this.anchorNodeCursor.extentOffset;
    this.selection[ 'baseNode' ] = this.anchorNodeCursor.baseNode;
    this.handleNoSelection();
  }

  handleNoSelection() {
    this.selectedContent = this.hasSelection();
  }

  hasSelection() {
    return (this.selection.end > 0) && (this.selection.end > this.selection.start);
  }

  setBold() {
    this.setContentFocus();
    document.execCommand( 'bold', false, null );
  }

  setItalic() {
    this.setContentFocus();
    document.execCommand( 'italic', false, null );
  }

  setUnorderedList() {
    this.setContentFocus();
    document.execCommand( 'insertUnorderedList', false, null );
  }

  setOrderedList() {
    this.setContentFocus();
    document.execCommand( 'insertOrderedList', false, null );
  }

  setCursorSelection() {
    this.cursorSelection = window.getSelection();
  }

  onChangeColor( $event ) {
    console.log( 'change value', $event );
  }

  setImage( $event ) {
    this.setContentFocus();
    this.image.imageUrl = $event.imageUrl;
    this.image.width = $event.width;
    this.image.height = $event.height;
    this.cursorSelection.getRangeAt( 0 ).insertNode(this.createImageElement());
    this.toggleImageBox();
  }

  toggleLinkBox() {
    this.toggleLink = !this.toggleLink;
  }

  toggleImageBox() {
    this.toggleImage = !this.toggleImage;
  }

  setDescriptionLink() {
    if ( this.selectedContent ) {
      this.descriptionLink = this.anchorNodeCursor.baseNode.nodeValue.substring( this.selection.start, this.selection.end );
      return;
    }
    this.descriptionLink = '';
  }

  setLink( $event ) {
    this.linkItself = $event.link;
    this.descriptionLink = $event.description;
    this.setContentFocus();
    this.recoverSelection();
    this.createElementLink();
    this.toggleLinkBox();
  }

  createImageElement() {
    const imageHTML = new ElementRef( this.renderer.createElement( 'img' ) );
    this.renderer.addClass(imageHTML.nativeElement, 'ui-image-editor');
    imageHTML.nativeElement.src = this.image.imageUrl;
    if (this.image.width > 0) {
      imageHTML.nativeElement.width = this.image.width;
    }
    if (this.image.height > 0) {
      imageHTML.nativeElement.height = this.image.height;
    }
    return imageHTML.nativeElement;
  }

  createElementLink() {
    const link = new ElementRef( this.renderer.createElement( 'a' ) );
    this.renderer.addClass( link.nativeElement, 'ui-link' );
    link.nativeElement.href = this.linkItself;
    link.nativeElement.text = this.descriptionLink;
    link.nativeElement.target = '_blank';
    this.handleAddElementRange( link );
  }


  handleAddElementRange( link ) {
    if ( this.selectedContent ) {
      window.getSelection().getRangeAt( 0 ).surroundContents( link.nativeElement );
    } else {
      window.getSelection().getRangeAt( 0 ).insertNode( link.nativeElement );
    }
  }

  recoverSelection() {
    const selection = window.getSelection();
    const range = document.createRange();
    range.setStart( this.selection.baseNode, this.selection.start );
    range.setEnd( this.selection.baseNode, this.selection.end );
    selection.removeAllRanges();
    selection.addRange( range );
  }

  setHighlight() {
    this.wrapper.nativeElement.style.cursor = 'grabbing';
    this.cursor = true;
  }

  resetCursor() {
    this.wrapper.nativeElement.style.cursor = 'auto';
  }

  setUnderline() {
    this.setContentFocus();
    document.execCommand( 'underline', false, null );
  }

  setContentFocus() {
    this.contentEditor.nativeElement.focus();
  }

  onChangeFont( $event ) {
    this.font = $event;
    this.setContentFocus();
    this.recoverSelection();
    document.execCommand( 'fontName', false, this.font );
  }

  onMouseUp() {
    this.toggleLink = false;
    this.setAnchorNode();
    if ( this.cursor ) {
      document.execCommand( 'hiliteColor', false, '#f0ef99' );
      this.cursor = false;
      this.resetCursor();
    }
  }

  ngOnChanges( data: SimpleChanges ) {
  }

}
