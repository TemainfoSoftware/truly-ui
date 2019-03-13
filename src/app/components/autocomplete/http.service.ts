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
 import { Injectable } from '@angular/core';
 import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

 import {Observable} from 'rxjs';

 import 'rxjs/add/operator/map';
 import 'rxjs/add/operator/catch';
 import 'rxjs/add/observable/throw';

 @Injectable()
 export class PersonService {

   private person;

   private url = 'https://developers.zomato.com/api/v2.1/cities';

   constructor(private http: HttpClient) { }

   getPerson() {
     return this.person;
   }

   setPerson(person) {
     this.person = person;
   }

   getCategories(inputValue): Observable<any> {
     const httpOptions = {
       headers: new HttpHeaders({
         'Content-Type':  'application/json',
         'user-key': 'f733fccde721f799b91eeb7293b5ca55',
       }),
       params: new HttpParams({
         fromObject: { q: !inputValue ? 'all' : inputValue, count: '1000' }
       })
     };
     return this.http.get(this.url, httpOptions)
       .map((res: Response) => res)
       .catch((error: any) => Observable.throw(error));
   }

 }
