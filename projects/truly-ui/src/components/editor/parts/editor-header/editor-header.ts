import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ToolbarConfig} from '../../interfaces/toolbar-config';
import {FieldContent} from '../../interfaces/field-content';

@Component({
  selector: 'tl-editor-header',
  templateUrl: './editor-header.html',
  styleUrls: ['./editor-header.scss']
})
export class TlEditorHeader implements OnInit {

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

  @Output() clickSave = new EventEmitter();

  @Output() clickField = new EventEmitter();

  @Input('labelAddField')
  set labelAddField( value: string ) {
    this._labelAddField = value;
  }

  get labelAddField() {
    return this._labelAddField;
  }

  private _labelAddField;

  public defaultField;

  constructor() {}

  ngOnInit() {
    this.defaultField = this.labelAddField;
  }

  onChangeField($event) {
    this.clickField.emit($event);
    setTimeout(() => this.defaultField = this.labelAddField);
  }
}
