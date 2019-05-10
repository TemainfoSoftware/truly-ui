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
import { PipeTransform, Pipe } from '@angular/core';
import { ChatContact } from '../interfaces/chat-contact.interface';

@Pipe( {
  name: 'status'
} )
export class TlStatusFilterPipe implements PipeTransform {

  transform( value: ChatContact[], param: { filter: string, status: Array<string> } ): any {
    if (value && value.length > 0) {
      return value.filter((item: ChatContact) =>
        (param.status.indexOf(item.status) >= 0) &&
        (item.name.toLocaleLowerCase().includes( param.filter.toLocaleLowerCase() )) );
    }
    return [];
  }

}
