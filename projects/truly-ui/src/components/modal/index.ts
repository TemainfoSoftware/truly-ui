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
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TlModal } from './modal';
import { ToneColorGenerator } from '../core/helper/tonecolor-generator';
import { TlBackdrop } from '../core/components/backdrop/backdrop';
import { LimitStringPipe } from '../core/helper/limitstring.pipe';
import { BackdropModule } from '../core/components/backdrop/index';
import { IconsModule } from '../icons/index';
import { ModalResultDirective } from './directives/modal-result.directive';
import { ShortcutService } from '../shortcut/shortcut.service';
import { ShortcutModule } from '../shortcut/index';
import { ModalService } from './services/modal.service';
import { SidebarService } from './services/sidebar.service';

@NgModule( {
    imports: [
      CommonModule,
      BackdropModule,
      ShortcutModule,
      IconsModule,
    ],
    declarations: [
      TlModal,
      ModalResultDirective,
      LimitStringPipe,
    ],
    exports: [
      TlModal,
      ModalResultDirective,
      LimitStringPipe
    ],
    entryComponents: [
      TlModal,
      TlBackdrop
    ]
} )
export class ModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ModalModule,
      providers: [
        ToneColorGenerator,
        ModalService,
        ShortcutService,
        SidebarService
      ],
    };
  }
}
