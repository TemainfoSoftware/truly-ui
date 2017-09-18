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
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from './modal.service';
import { TlModal } from './modal';
import { ToneColorGenerator } from '../core/helper/tonecolor-generator';
import { TlBackdrop } from '../core/components/backdrop/backdrop';
import { TlContainerModal } from './container-modal/container-modal';
import { LimitStringPipe } from '../core/helper/limitstring.pipe';

export * from './modal';

@NgModule( {
    imports: [
        CommonModule,
    ],
    declarations: [
        TlModal,
        TlContainerModal,
        TlBackdrop,
        LimitStringPipe
    ],
    exports: [
        TlModal,
        TlContainerModal,
    ],
    entryComponents: [
        TlModal,
        TlBackdrop
    ],
    providers: [
        ToneColorGenerator
    ]
} )
export class ModalModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ModalModule,
            providers: [
                ModalService
            ]
        }
    }
}
