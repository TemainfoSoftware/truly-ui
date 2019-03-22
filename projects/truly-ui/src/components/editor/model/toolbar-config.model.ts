/*
 MIT License

 Copyright (c) 2019 Temainfo Sistemas

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
import { forwardRef, Inject } from '@angular/core';
import { I18nService } from '../../i18n/i18n.service';

export class ToolbarConfigModel {

  constructor( @Inject( forwardRef( () => I18nService)) public i18n: I18nService ) {}

  public font = {
    family: { show: true, tooltipText: this.i18n.getLocale().Editor.fontFamilyText },
    size: { show: true, tooltipText: this.i18n.getLocale().Editor.fontSizeText },
    bold: { show: true, tooltipText: this.i18n.getLocale().Editor.boldText },
    italic: { show: true, tooltipText: this.i18n.getLocale().Editor.italicText },
    underline: { show: true, tooltipText: this.i18n.getLocale().Editor.underlineText },
    color: { show: true, tooltipText: this.i18n.getLocale().Editor.colorText },
    highlight: { show: true, tooltipText: this.i18n.getLocale().Editor.highlightText },
  };
  public alignment = {
    left: { show: true, tooltipText: this.i18n.getLocale().Editor.alignLeftText },
    center: { show: true, tooltipText: this.i18n.getLocale().Editor.alignCenterText },
    right: { show: true, tooltipText: this.i18n.getLocale().Editor.alignRightText },
    justify: { show: true, tooltipText: this.i18n.getLocale().Editor.justifyText }
  };
  public lists = {
    ordered: { show: true, tooltipText: this.i18n.getLocale().Editor.listOrdered },
    unordered: { show: true, tooltipText: this.i18n.getLocale().Editor.listUnordered }
  };
  public others = {
    link: { show: true, tooltipText: this.i18n.getLocale().Editor.linkText },
    imageLink: { show: true, tooltipText: this.i18n.getLocale().Editor.imageText },
    quote: { show: true, tooltipText: this.i18n.getLocale().Editor.quoteText }
  };

}
