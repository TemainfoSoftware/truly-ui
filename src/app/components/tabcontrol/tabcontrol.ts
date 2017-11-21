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
  Component, ElementRef, ContentChildren, QueryList, forwardRef, Input, AfterContentInit, ViewChild, Renderer2,
} from '@angular/core';

import { ModalService } from '../modal/modal.service';
import { TabIndexService } from '../form/tabIndex.service';
import { IdGeneratorService } from '../core/helper/idgenerator.service';
import { NameGeneratorService } from '../core/helper/namegenerator.service';
import { ComponentDefaultBase } from '../core/base/component-default.base';
import { TlTab } from './tab/tab';

@Component( {
    selector: 'tl-tabcontrol',
    templateUrl: './tabcontrol.html',
    styleUrls: [ './tabcontrol.scss' ]
} )
export class TlTabControl extends ComponentDefaultBase implements AfterContentInit {

    @Input( 'height' ) height = 'auto';

    @ViewChild('tabsHeader') tabsHeader;

    @ContentChildren( forwardRef(() => TlTab )) tabs: QueryList<TlTab>;

    private elementListTabs;

    public widthSeparator = 0;

    constructor( public button: ElementRef, public modalService: ModalService,
                 tabIndexService: TabIndexService, idService: IdGeneratorService, nameService: NameGeneratorService ) {
        super( tabIndexService, idService, nameService );
    }

    ngAfterContentInit() {
      const selectedTab = this.tabs.find(tab => tab.selected);
      if (!selectedTab && this.tabs.first) {
        this.tabs.first.selected = true;
      }
      this.setTabHeight();
      this.getElementList();
    }

    selectTab(tab: TlTab) {
      this.tabs.forEach(item => item.selected = false);
      tab.selected = true;
    }

  setTabHeight() {
    this.tabs.forEach( ( item, index, array ) => {
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
      for (let i = 0; i < this.elementListTabs.length; i++) {
        this.widthSeparator = this.widthSeparator + Number(this.elementListTabs[i].offsetWidth) - 1;
      }
    }

    get tabsContext() {
      return {
        tabs: this.tabs
      };
    }

}


