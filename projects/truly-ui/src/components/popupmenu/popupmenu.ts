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
import {
  ViewChild, Input, AfterViewInit, Component, OnDestroy, ViewContainerRef, Renderer2,
  OnInit
} from '@angular/core';
import { MenuService } from '../core/services/menu.service';
import { TlButton } from '../button/button';
import { FixedPositionDirective } from '../misc/fixed-position.directive';

let documentClick;

@Component( {
  selector: 'tl-popupmenu',
  templateUrl: './popupmenu.html',
  styleUrls: [ './popupmenu.scss' ],
  providers: [MenuService]
} )
export class TlPopupMenu implements AfterViewInit, OnInit, OnDestroy {

  @Input() items = [];

  @Input() label = '';

  @Input() icon = '';

  @Input() subItem = '';

  @Input() trigger;

  @Input() target;

  @Input() positionY = 'bellow';

  @Input() overlapTrigger = false;

  @Input() positionX = 'before';

  @Input() hover = false;

  @ViewChild( 'wrapperMenuItem', { read: ViewContainerRef, static: true } ) wrapperMenuItem: ViewContainerRef;

  @ViewChild( FixedPositionDirective, {static: true} ) fixedPos: FixedPositionDirective;

  constructor(private menuService: MenuService, private renderer: Renderer2) {}

  ngOnInit() {
    this.listenDocumentClick();
  }

  ngAfterViewInit() {
    this.validateTarget();
    this.listenTrigger();
    this.listenTriggerMouseLeave();
    this.menuService.setMenuConfig({ label: this.label, icon: this.icon, items: this.items, subItem: this.subItem},
      this.wrapperMenuItem, this.renderer);
  }

  validateTarget() {
    if (this.target instanceof TlButton) {
      this.target = this.target['button'].nativeElement;
    }
    if (this.trigger instanceof TlButton) {
      this.trigger = this.trigger['button'].nativeElement;
    }
    if (!this.target) {
      throw new Error('The [target] property is required');
    }
  }

  listenDocumentClick() {
    documentClick = this.renderer.listen( document, 'click', ( $event ) => {
      if (($event.path.indexOf(this.target) < 0) && ($event.path.indexOf(this.trigger) < 0)) {
        this.menuService.resetMenu();
      }
    } );
  }

  listenTrigger() {
    const element = this.trigger ? this.trigger : this.target;
    const eventType = this.hover ? 'mouseenter' : 'click';
    this.renderer.listen(element, eventType, () => {
      if (this.menuService.created) {
        this.menuService.resetMenu();
        return;
      }
      this.menuService.createList();
      this.fixedPos.setPositioning();
    });
  }

  listenTriggerMouseLeave() {
    if (this.hover) {
      const element = this.trigger ? this.trigger : this.target;
      this.renderer.listen(element, 'mouseleave', ($event) => {
        if (!$event.relatedTarget.getAttribute('menuitem')) {
          this.menuService.resetMenu();
        }
      });
    }
  }

  ngOnDestroy() {
    documentClick();
  }

}
