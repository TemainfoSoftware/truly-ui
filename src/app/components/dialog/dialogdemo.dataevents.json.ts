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

export const dataEvents = [
  {
    name: 'info',
    parameters: [
      { event: 'message: string', description: 'The message itself' },
      { event: 'options: InfoOptions', description: 'Options of type InfoOptions ' },
      { event: 'mdOptions: ModalOptions', description: 'Options of modal container' },
      { event: 'Promisse', description: 'returns a promisse with dialog result' },
    ],
    description: 'Show a information dialog message.',
  },
  {
    name: 'alert',
    parameters: [
      { event: 'message: string', description: 'The message itself' },
      { event: 'options: AlertOptions', description: 'Options of type AlertOptions ' },
      { event: 'mdOptions: ModalOptions', description: 'Options of modal container' },
      { event: 'Promisse', description: 'returns a promisse with dialog result' },
    ],
    description: 'Show a alert dialog message.',
  },
  {
    name: 'error',
    parameters: [
      { event: 'message: string', description: 'The message itself' },
      { event: 'options: ErrorOptions', description: 'Options of type ErrorOptions ' },
      { event: 'mdOptions: ModalOptions', description: 'Options of modal container' },
      { event: 'Promisse', description: 'returns a promisse with dialog result' },
    ],
    description: 'Show a error dialog message.',
  },
  {
    name: 'confirmation',
    parameters: [
      { event: 'message', description: 'The message itself' },
      { event: 'callback', description: 'Callback of type ConfirmCallback, returned after closed. ' },
      { event: 'options: ConfirmationOptions', description: 'Options of type ConfirmationOptions ' },
      { event: 'mdOptions: ModalOptions', description: 'Options of modal container' },
    ],
    description: 'Show a confirmation dialog with two buttons.',
  },
];
