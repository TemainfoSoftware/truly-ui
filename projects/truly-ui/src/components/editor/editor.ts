/*
 MIT License

 Copyright (c) 2019 Temainfo Software

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
  Component, ElementRef, EventEmitter, forwardRef, Input, OnChanges, Output, Renderer2, SimpleChanges, ViewChild,
} from '@angular/core';

import {trigger, transition, style, animate} from '@angular/animations';
import {ToolbarConfigModel} from './model/toolbar-config.model';
import {ToolbarConfig} from './interfaces/toolbar-config';
import {I18nService} from '../i18n/i18n.service';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'tl-editor',
  templateUrl: './editor.html',
  styleUrls: ['./editor.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TlEditor),
    multi: true
  }],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('250ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('250ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ],
})
export class TlEditor implements ControlValueAccessor, AfterContentInit, OnChanges {

  @Input() content: SafeHtml;

  @Input() color = 'basic';

  @Input() tags = [];

  @Input() toolbarConfig: ToolbarConfig;

  @Input() height = '300px';

  @Input() labelPlacement = 'top';

  @Input() labelSize = '100px';

  @Input() label = '';

  @Input() formControl;

  @ViewChild('contentEditor', {static: true}) contentEditor;

  @ViewChild('linkBox', {static: true}) linkBox;

  @ViewChild('wrapper', {static: true}) wrapper;

  @Output() saveContent = new EventEmitter();

  public fontCollection = [];

  public fontSizeCollection = [];

  public font = 'Arial';

  public fontSize = '3pt';

  public toggleLink = false;

  public toggleImage = false;

  public saved = false;

  public descriptionLink = '';

  public linkItself = '';

  public colorSelected = '#000000';

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

  public image = {imageUrl: ''};

  public selection = {start: 0, end: 0, baseNode: null, extentNode: null};

  private interval;

  private onChange: any = () => {};

  private onTouched: any = () => {};

  constructor(private i18n: I18nService, private renderer: Renderer2, private sanitizer: DomSanitizer) {
    this.fontCollection = [
      {description: 'Arial', value: 'Arial'},
      {description: 'Verdana', value: 'Verdana'},
      {description: 'Calibri', value: 'Calibri'},
      {description: 'Courier New', value: 'Courier New'},
      {description: 'Georgia', value: 'Georgia'},
      {description: 'Trebuchet MS', value: 'Trebuchet MS'},
      {description: 'Bookman', value: 'Bookman'}
    ];
    this.fontSizeCollection = [
      {description: '10', value: '1pt'},
      {description: '20', value: '2pt'},
      {description: '30', value: '3pt'},
      {description: '40', value: '4pt'},
      {description: '50', value: '5pt'},
      {description: '60', value: '6pt'},
      {description: '70', value: '7pt'}
    ];
  }

  ngAfterContentInit() {
    this.setContentFocus();
    this.toolbarConfig = Object.assign(new ToolbarConfigModel(this.i18n), this.toolbarConfig);
  }

  alignContent(align) {
    this.setContentFocus();
    const element = this.cursorSelection.baseNode.parentNode;
    const alignment = align === 'justifyFull' ? 'justify' : align.replace('justify', '').toLocaleLowerCase();
    this.renderer.setStyle( element, 'text-align', alignment);
    this.setCursorSelection();
  }

  setBold() {
    this.setContentFocus();
    document.execCommand('bold', false, null);
    this.setCursorSelection();
  }

  setQuote() {
    this.setContentFocus();
    this.activeTools.blockQuote = !this.activeTools.blockQuote;
    document.execCommand('formatBlock', false, this.activeTools.blockQuote ? 'blockquote' : 'div');
    this.setCursorSelection();
  }

  setItalic() {
    this.setContentFocus();
    document.execCommand('italic', false, null);
    this.setCursorSelection();
  }

  setUnorderedList() {
    this.setContentFocus();
    document.execCommand('insertUnorderedList', false, null);
    this.setCursorSelection();
  }

  setOrderedList() {
    this.setContentFocus();
    document.execCommand('insertOrderedList', false, null);
    this.setCursorSelection();
  }

  setImage($event) {
    this.setContentFocus();
    this.image.imageUrl = $event.imageUrl;
    this.cursorSelection.getRangeAt(0).insertNode(this.createImageElement());
    this.toggleImageBox();
  }

  setDescriptionLink() {
    if (this.selectedContent) {
      this.descriptionLink = this.anchorNodeCursor.baseNode.nodeValue.substring(this.selection.start, this.selection.end);
      return;
    }
    this.descriptionLink = '';
  }

  addTag( value: string ) {
    this.setContentFocus();
    this.cursorSelection.getRangeAt(0).insertNode( this.createHashTag( value ).nativeElement );
    window.getSelection().collapseToEnd();
    this.change( { target: this.contentEditor.nativeElement } );
  }

  setLink($event) {
    this.linkItself = $event.link;
    this.descriptionLink = $event.description;
    this.setContentFocus();
    this.recoverSelection();
    this.createElementLink();
    this.toggleLinkBox();
  }

  setUnderline() {
    this.setContentFocus();
    document.execCommand('underline', false, null);
    this.setCursorSelection();
  }

  setHighlight() {
    this.wrapper.nativeElement.style.cursor = 'grabbing';
    this.cursorHighlight = true;
  }

  onChangeColor($event) {
    document.execCommand('foreColor', false, $event.hex);
  }

  onChangeFontSize($event) {
    this.recoverSelection();
    this.setContentFocus();
    this.fontSize = $event;
    document.execCommand('fontSize', null, this.fontSize);
  }

  onChangeFont($event) {
    this.recoverSelection();
    this.setContentFocus();
    this.font = $event;
    document.execCommand('fontName', false, this.font);
  }

  onMouseUp() {
    this.toggleLink = false;
    this.setAnchorNode();
    if (this.cursorHighlight) {
      document.execCommand('hiliteColor', false, '#f0ef99');
      this.cursorHighlight = false;
      this.resetCursor();
    }
  }

  onKeyDownSave(event) {
    if ( event.target.innerHTML.length === 0 || event.target.innerHTML === '<br>' ) {
      this.writeValue('<div><br></div>');
    }
    if ((event.ctrlKey || event.metaKey) && event.which === 83) {
      event.preventDefault();
      this.save();
      return false;
    }
  }

  toggleLinkBox() {
    this.toggleLink = !this.toggleLink;
  }

  toggleImageBox() {
    this.toggleImage = !this.toggleImage;
  }

  save() {
    this.saveContent.emit(this.contentEditor.nativeElement.innerHTML);
    this.showSavedMessage();
  }

  setCursorSelection() {
    this.cursorSelection = window.getSelection();
    if ( this.cursorSelection.baseNode ) {
      this.handleActiveTools();
    }
  }

  private showSavedMessage() {
    this.saved = true;
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.saved = false;
    }, 1000);
  }

  private handleActiveTools() {
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

  private handleFontName() {
    this.isClosestParentElement('font') && this.hasFontFace()
      ? this.setFontNodeSelected() : this.setDefaultFont();
  }

  private hasFontFace() {
    return this.cursorSelection.baseNode.parentNode.closest('font').getAttribute('face');
  }

  private hasFontSize() {
    return this.cursorSelection.baseNode.parentNode.closest('font').getAttribute('size');
  }

  private setFontNodeSelected() {
    this.font = this.cursorSelection.baseNode.parentNode.closest('font').getAttribute('face');
  }

  private setDefaultFont() {
    this.font = 'Arial';
  }

  private setFontSizeNodeSelected() {
    this.fontSize = this.cursorSelection.baseNode.parentNode.closest('font').getAttribute('size') + 'pt';
  }

  private setDefaultFontSize() {
    this.fontSize = '3pt';
  }

  setAnchorNode() {
    this.anchorNodeCursor = document.getSelection();
    this.selection['start'] = this.anchorNodeCursor.baseOffset;
    this.selection['end'] = this.anchorNodeCursor.extentOffset;
    this.selection['baseNode'] = this.anchorNodeCursor.baseNode;
    this.selection['extentNode'] = this.anchorNodeCursor.extentNode;
    this.handleNoSelection();
  }

  private handleNoSelection() {
    this.selectedContent = this.hasSelection();
  }

  private hasSelection() {
    return (this.selection.end > 0) && (this.selection.end > this.selection.start);
  }

  private handleFontSize() {
    this.isClosestParentElement('font') && this.hasFontSize()
      ? this.setFontSizeNodeSelected() : this.setDefaultFontSize();
  }

  private handleAlignLeft() {
    this.activeTools.alignLeft = this.hasStyleParentElement('left');
  }

  private handleAlignCenter() {
    this.activeTools.alignCenter = this.hasStyleParentElement('center');
  }

  private handleAlignRight() {
    this.activeTools.alignRight = this.hasStyleParentElement('right');
  }

  private handleAlignJustify() {
    this.activeTools.alignJustify = this.hasStyleParentElement('justify');
  }

  private handleListOrdered() {
    this.activeTools.listOrdered = this.isClosestParentElement('ol');
  }

  private handleListUnordered() {
    this.activeTools.listUnordered = this.isClosestParentElement('ul');
  }

  private handleColorParent() {
    const getElementFont = this.cursorSelection.baseNode.parentNode.closest('font');
    getElementFont ? this.setColorWithColorElement(getElementFont) : this.colorSelected = '#000000';
  }

  private setColorWithColorElement(getElementFont) {
    this.colorSelected = getElementFont.getAttribute('color');
  }

  private handleClosestBold() {
    this.activeTools.bold = this.isClosestParentElement('b');
  }

  private handleClosestUnderline() {
    this.activeTools.underline = this.isClosestParentElement('u');
  }

  private handleClosestItalic() {
    this.activeTools.italic = this.isClosestParentElement('i');
  }

  private handleBlockQuote() {
    this.activeTools.blockQuote = this.isClosestParentElement('blockquote');
  }

  private hasStyleParentElement(alignment: string) {
    const element = this.cursorSelection.baseNode.parentNode;
    if (element.attributes.length > 0) {
      return element.attributes[0].value.includes(alignment);
    }
    return false;
  }

  private isClosestParentElement(element) {
    return !!this.cursorSelection.baseNode.parentNode.closest(element);
  }

  private createHashTag( value: string ) {
    const hashTag = new ElementRef(this.renderer.createElement('span'));
    this.renderer.addClass(hashTag.nativeElement, 'ui-hashtag');
    hashTag.nativeElement.innerText = value;
    hashTag.nativeElement.setAttribute('contenteditable', false);
    return hashTag;
  }

  private createImageElement() {
    const imageHTML = new ElementRef(this.renderer.createElement('img'));
    this.renderer.addClass(imageHTML.nativeElement, 'ui-image-editor');
    imageHTML.nativeElement.setAttribute('src', this.image.imageUrl);
    return imageHTML.nativeElement;
  }

  private createElementLink() {
    const link = new ElementRef(this.renderer.createElement('a'));
    this.renderer.addClass(link.nativeElement, 'ui-link');
    link.nativeElement.setAttribute('src', this.linkItself);
    link.nativeElement.setAttribute('text', this.descriptionLink);
    link.nativeElement.setAttribute('target', '_blank');
    this.handleAddElementRange(link);
  }

  private handleAddElementRange(link) {
    this.selectedContent ? window.getSelection().getRangeAt(0).surroundContents(link.nativeElement) :
      window.getSelection().getRangeAt(0).insertNode(link.nativeElement);
  }

  private recoverSelection() {
    const selection = document.getSelection();
    const range = document.createRange();
    if (this.selection.baseNode) {
      range.setStart(this.selection.baseNode, this.selection.start);
      range.setEnd(this.selection.extentNode, this.selection.end);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  private resetCursor() {
    this.wrapper.nativeElement.style.cursor = 'auto';
  }

  private setContentFocus() {
    this.contentEditor.nativeElement.focus();
  }

  clearContent() {
    this.writeValue('');
  }

  writeValue(value: any): void {
    this.content = this.sanitizer.bypassSecurityTrustHtml(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  change($event) {
    this.onChange($event.target.innerHTML);
    this.onTouched($event.target.innerHTML);
  }

  ngOnChanges(data: SimpleChanges) {
  }

}
