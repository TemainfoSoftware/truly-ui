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
  Component, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, ViewChild,
} from '@angular/core';

@Component( {
  selector: 'tl-editor',
  templateUrl: './editor.html',
  styleUrls: [ './editor.scss' ],
} )

export class TlEditor implements AfterContentInit, OnChanges {

  @Input() content;

  @ViewChild( 'contentEditor' ) contentEditor;

  @ViewChild( 'linkBox' ) linkBox;

  @ViewChild( 'wrapper' ) wrapper;

  public dataFont = [];

  public dataFontSize = [];

  public font = 'Arial';

  public fontSize = '3pt';

  public toggleLink = false;

  public toggleImage = false;

  public descriptionLink = '';

  public linkItself = '';

  public colorSelected = '#00000';

  public anchorNodeCursor;

  public cursorHighlight = false;

  public selectedContent = false;

  public cursorSelection;

  public contentEditable = true;

  public activeTools = {
    bold: false,
    italic: false,
    underline: false,
    listUnordered: false,
    listOrdered: false,
    alignLeft: false,
    alignCenter: false,
    alignRight: false,
    alignJustify: false,
    blockQuote: false
  };

  public image = { imageUrl: '' };

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
    this.dataFontSize = [ '1pt', '2pt', '3pt', '4pt', '5pt', '6pt', '7pt' ];
  }

  ngAfterContentInit() {
    this.setContentFocus();
  }

  alignContent( align ) {
    this.setContentFocus();
    document.execCommand( align, false, null );
    this.setCursorSelection();
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
    this.setCursorSelection();
  }

  setQuote() {
    this.setContentFocus();
    this.activeTools.blockQuote = !this.activeTools.blockQuote;
    document.execCommand( 'formatBlock', false, this.activeTools.blockQuote ? 'blockquote' : 'div' );
    this.setCursorSelection();
  }

  setItalic() {
    this.setContentFocus();
    document.execCommand( 'italic', false, null );
    this.setCursorSelection();
  }

  setUnorderedList() {
    this.setContentFocus();
    document.execCommand( 'insertUnorderedList', false, null );
    this.setCursorSelection();
  }

  setOrderedList() {
    this.setContentFocus();
    document.execCommand( 'insertOrderedList', false, null );
    this.setCursorSelection();
  }

  setCursorSelection() {
    this.cursorSelection = window.getSelection();
    this.handleActiveTools();
  }

  handleActiveTools() {
    this.handleClosestBold();
    this.handleClosestItalic();
    this.handleClosestUnderline();
    this.handleColorParent();
    this.handleListUnordered();
    this.handleListOrdered();
    this.handleAlignLeft();
    this.handleAlignCenter();
    this.handleAlignRight();
    this.handleAlignJustify();
    this.handleFontSize();
    this.handleFontName();
    this.handleBlockQuote();
  }

  handleFontName() {
    this.isClosestParentElement( 'font' ) && this.hasFontFace()
      ? this.setFontNodeSelected() : this.setDefaultFont();
  }

  hasFontFace() {
    return this.cursorSelection.baseNode.parentNode.closest( 'font' ).getAttribute( 'face' );
  }

  hasFontSize() {
    return this.cursorSelection.baseNode.parentNode.closest( 'font' ).getAttribute( 'size' );
  }

  setFontNodeSelected() {
    this.font = this.cursorSelection.baseNode.parentNode.closest( 'font' ).getAttribute( 'face' );
  }

  setDefaultFont() {
    this.font = 'Arial';
  }

  setFontSizeNodeSelected() {
    this.fontSize = this.cursorSelection.baseNode.parentNode.closest( 'font' ).getAttribute( 'size' ) + 'pt';
  }

  setDefaultFontSize() {
    this.fontSize = '3pt';
  }

  handleFontSize() {
   this.isClosestParentElement( 'font' ) && this.hasFontSize()
     ? this.setFontSizeNodeSelected() : this.setDefaultFontSize();
  }

  handleAlignLeft() {
    this.activeTools.alignLeft = this.hasStyleParentElement( 'left' );
  }

  handleAlignCenter() {
    this.activeTools.alignCenter = this.hasStyleParentElement( 'center' );
  }

  handleAlignRight() {
    this.activeTools.alignRight = this.hasStyleParentElement( 'right' );
  }

  handleAlignJustify() {
    this.activeTools.alignJustify = this.hasStyleParentElement( 'justify' );
  }

  handleListOrdered() {
    this.activeTools.listOrdered = this.isClosestParentElement( 'ol' );
  }

  handleListUnordered() {
    this.activeTools.listUnordered = this.isClosestParentElement( 'ul' );
  }

  onChangeColor($event) {
    document.execCommand('foreColor', false, $event);
  }

  handleColorParent() {
    const getElementFont = this.cursorSelection.baseNode.parentNode.closest( 'font' );
    getElementFont ? this.colorSelected = getElementFont.getAttribute( 'color' ) : this.colorSelected = '#00000';
  }

  handleClosestBold() {
    this.activeTools.bold = this.isClosestParentElement( 'b' );
  }

  handleClosestUnderline() {
    this.activeTools.underline = this.isClosestParentElement( 'u' );
  }

  handleClosestItalic() {
    this.activeTools.italic = this.isClosestParentElement( 'i' );
  }

  handleBlockQuote() {
    this.activeTools.blockQuote = this.isClosestParentElement( 'blockquote' );
  }

  hasStyleParentElement( alignment: string ) {
    const childElement = this.cursorSelection.baseNode.parentNode;
    if ( childElement.attributes.length > 0 ) {
      return childElement.attributes[ 0 ].value.includes( alignment );
    }
    return false;
  }

  isClosestParentElement( element ) {
    return !!this.cursorSelection.baseNode.parentNode.closest( element );
  }

  setImage( $event ) {
    this.setContentFocus();
    this.image.imageUrl = $event.imageUrl;
    this.cursorSelection.getRangeAt( 0 ).insertNode( this.createImageElement() );
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
    this.renderer.addClass( imageHTML.nativeElement, 'ui-image-editor' );
    imageHTML.nativeElement.src = this.image.imageUrl;
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
    this.selectedContent ? window.getSelection().getRangeAt( 0 ).surroundContents( link.nativeElement ) :
      window.getSelection().getRangeAt( 0 ).insertNode( link.nativeElement );
  }

  recoverSelection() {
    const selection = window.getSelection();
    const range = document.createRange();
    range.setStart( this.selection.baseNode, this.selection.start );
    range.setEnd( this.selection.baseNode, this.selection.end );
    selection.removeAllRanges();
    selection.addRange( range );
  }

  onChangeFontSize( $event ) {
    this.recoverSelection();
    this.setContentFocus();
    this.fontSize = $event;
    document.execCommand( 'fontSize', null, parseInt( this.fontSize, 10 ) );
  }

  setHighlight() {
    this.wrapper.nativeElement.style.cursor = 'grabbing';
    this.cursorHighlight = true;
  }

  resetCursor() {
    this.wrapper.nativeElement.style.cursor = 'auto';
  }

  setUnderline() {
    this.setContentFocus();
    document.execCommand( 'underline', false, null );
    this.setCursorSelection();
  }

  setContentFocus() {
    this.contentEditor.nativeElement.focus();
  }

  onChangeFont( $event ) {
    this.recoverSelection();
    this.setContentFocus();
    this.font = $event;
    document.execCommand( 'fontName', false, this.font );
  }

  onMouseUp() {
    this.toggleLink = false;
    this.setAnchorNode();
    if ( this.cursorHighlight ) {
      document.execCommand( 'hiliteColor', false, '#f0ef99' );
      this.cursorHighlight = false;
      this.resetCursor();
    }
  }

  ngOnChanges( data: SimpleChanges ) {}

}
