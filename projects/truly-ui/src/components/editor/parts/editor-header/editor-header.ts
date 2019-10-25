import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ToolbarConfig} from '../../interfaces/toolbar-config';

@Component({
  selector: 'tl-editor-header',
  templateUrl: './editor-header.html',
  styleUrls: ['./editor-header.scss']
})
export class TlEditorHeader {

  @Input() toolbarConfig: ToolbarConfig;

  @Input() cursorHighlight = false;

  @Input() fontSizeCollection = [];

  @Input() fontCollection = [];

  @Input() color = 'basic';

  @Input() activeTools;

  @Output() changeColor = new EventEmitter();

  @Output() changeFont = new EventEmitter();

  @Output() changeFontSize = new EventEmitter();

  @Output() clickUnderline = new EventEmitter();

  @Output() clickItalic = new EventEmitter();

  @Output() clickBold = new EventEmitter();

  @Output() clickHighlight = new EventEmitter();

  @Output() clickAlignContent = new EventEmitter();

  @Output() clickUnorderedList = new EventEmitter();

  @Output() clickOrderedList = new EventEmitter();

  @Output() clickLink = new EventEmitter();

  @Output() clickImage = new EventEmitter();

  @Output() clickQuote = new EventEmitter();

  public colorSelected = '#000000';

  public fontSelected = 'Arial';

  public fontSizeSelected = '3pt';

  constructor() {}
  // toggleLinkBox(); clickDescriptionLink();
}
