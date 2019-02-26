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
import { ModalResult } from '../../../../projects/truly-ui/src/components/core/enums/modal-result';

export const dataProperties = [
  {
    name: 'MRFREE',
    description: 'Modal Result to describe free',
    value: ModalResult.MRFREE
  },
  {
    name: 'MRCUSTOM',
    description: 'Modal Result to describe a custom result',
    value: ModalResult.MRCUSTOM
  },
  {
    name: 'MROK',
    description: 'Modal Result to describe OK action, used on buttons.',
    value: ModalResult.MROK
  },
  {
    name: 'MRCANCEL',
    description: 'Modal Result to describe when modal is canceled.',
    value: ModalResult.MRCANCEL
  },
  {
    name: 'MRABORT',
    description: 'Modal Result to describe abort operation.',
    value: ModalResult.MRABORT
  },
  {
    name: 'MRRETRY',
    description: 'Modal Result to describe retry operation.',
    value: ModalResult.MRRETRY
  },
  {
    name: 'MRIGNORE',
    description: 'Modal Result to describe ignore operation.',
    value: ModalResult.MRIGNORE
  },
  {
    name: 'MRYES',
    description: 'Modal Result to describe Yes, used to confirm operations.',
    value: ModalResult.MRYES
  },
  {
    name: 'MRNO',
    description: 'Modal Result to describe No, used to deny operations',
    value: ModalResult.MRNO
  },
  {
    name: 'MRCLOSE',
    description: 'odal Result to describe when modal is canceled',
    value: ModalResult.MRCLOSE
  },
  ];
