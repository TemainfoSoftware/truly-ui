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
  Component, ContentChildren, QueryList, forwardRef, Input, AfterContentInit, ViewChild, AfterViewInit, Renderer2,
} from '@angular/core';

import { TabIndexService } from '../form/tabIndex.service';
import { IdGeneratorService } from '../core/helper/idgenerator.service';
import { NameGeneratorService } from '../core/helper/namegenerator.service';
import { ComponentDefaultBase } from '../core/base/component-default.base';
import { TlTab } from './tab/tab';
import { TlModal } from '../modal/modal';

@Component( {
    selector: 'tl-tabcontrol',
    templateUrl: './tabcontrol.html',
    styleUrls: [ './tabcontrol.scss' ]
} )
export class TlTabControl extends ComponentDefaultBase implements AfterContentInit, AfterViewInit {

    @Input( 'height' ) height = 'auto';

    @Input( 'background' ) background = '#fff';

    @Input( 'titleColor' ) titleColor = '#848484';

    @ViewChild('tabsHeader') tabsHeader;

    @ViewChild('wrapperTab') wrapper;

    @ViewChild('line') line;

    @ContentChildren( forwardRef(() => TlTab )) tabs: QueryList<TlTab>;

    @ViewChild( forwardRef(() => TlModal )) modal: QueryList<TlModal>;

    private elementListTabs;

    public widthSeparator = '';

    public widthTabs = 0;

    public widthWrapper = 0;

    public topPosition = 0;

    constructor( tabIndexService: TabIndexService, idService: IdGeneratorService, nameService: NameGeneratorService ) {
        super( tabIndexService, idService, nameService );
    }

    ngAfterContentInit() {
      const selectedTab = this.tabs.find(tab => tab.selected);
      if (!selectedTab && this.tabs.first) {
        this.tabs.first.selected = true;
      }
      this.setTabProperties();
      this.getElementList();
    }

    ngAfterViewInit() {
      this.getWrapperWidth();
    }

    getWrapperWidth() {
      this.widthWrapper = Math.round(this.wrapper.nativeElement.offsetWidth);
    }

    selectTab(tab: TlTab) {
      this.tabs.forEach(item => item.selected = false);
      tab.selected = true;
    }

    setTabProperties() {
      this.tabs.forEach( ( item, index, array ) => {
        item.background = this.background;
        item.height = this.height;
      } );
    }

    getElementList() {
      setTimeout(() => {
        const templateChildren = this.tabsHeader.elementRef.nativeElement.parentElement.children;
        for (let element = 0; element < templateChildren.length; element++) {
          if (templateChildren[element].localName === 'ul') {
            this.elementListTabs = templateChildren[element].children;
          }
        }
        this.setWidthSeparator();
      }, 1);
    }

    setWidthSeparator() {
      this.widthTabs = 0;
      for (let i = 0; i < this.elementListTabs.length; i++) {
        this.widthTabs = this.widthTabs + Number(this.elementListTabs[i].offsetWidth);
        this.topPosition = this.wrapper.nativeElement.offsetTop + (this.line.nativeElement.offsetHeight / 2) - 1;
      }
      this.widthSeparator = 'calc(100% - ' + (this.widthTabs + this.wrapper.nativeElement.offsetLeft +
        this.line.nativeElement.offsetLeft) + 'px' + ' )';
    }

    get tabsContext() {
      return {
        tabs: this.tabs
      };
    }

}


