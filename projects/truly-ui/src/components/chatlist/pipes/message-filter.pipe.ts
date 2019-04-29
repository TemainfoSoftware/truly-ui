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
import { ChatMessage } from '../interfaces/chat-message.interface';

@Pipe( {
  name: 'filterMessage'
} )
export class TlMessageFilterPipe implements PipeTransform {

  public groupMessages = [];

  transform( messages: ChatMessage[] ): any {
    this.groupMessages = [];
    messages.forEach((value) => {
      if ( !this.hasDateGroup( value.time ) ) {
        this.groupMessages.push({
          date: this.formatDate( value.time ),
          messages: [value]
        });
      } else {
        const index = this.findIndexByDate( this.formatDate( value.time ) );
        this.groupMessages[index].messages = [ ...this.groupMessages[index].messages, value ];
      }
    });
    return this.groupMessages;
  }

  findIndexByDate( date: number ) {
    return this.groupMessages.findIndex((value, index, obj) => value.date === date);
  }

  hasDateGroup( date: Date) {
    if (this.groupMessages.length === 0) {
      return false;
    }
    return this.groupMessages.filter((value, index, array) =>
      this.formatDate( new Date(value.date)) === this.formatDate(date)).length > 0;
  }

  formatDate( date: Date ) {
    return new Date( date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0).getTime();
  }

}
