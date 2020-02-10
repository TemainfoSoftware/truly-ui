import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ToolbarConfig} from '../../interfaces/toolbar-config';
import {FieldContent} from '../../editor.service';

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

  @Input() fields: FieldContent[] = [];

  @Input() color = 'basic';

  @Input() activeTools;

  @Input() colorSelected = '#000000';

  @Input() fontSelected = 'Arial';

  @Input() fontSizeSelected = '3pt';

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

  @Output() clickClear = new EventEmitter();

  @Output() clickField = new EventEmitter();

  public defaultField = 'Add Field';

  constructor() {}

  onChangeField($event) {
    this.clickField.emit($event);
    setTimeout(() => this.defaultField = 'Add Field');
  }
}
