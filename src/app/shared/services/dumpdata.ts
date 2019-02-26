/*
 MIT License

 Copyright (c) 2019 Temainfo Software

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the 'Software'), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
import { Injectable } from '@angular/core';
@Injectable()
export class DumpDataService {

  constructor() {}

  createRandomData(count: number) {
    const firstNames = ['Adilson', 'William', 'Silvio', 'Maicon', 'Jaisson', 'Moacyr', 'Marcio', 'Laura', 'Anne', 'Nige'],
          lastNames = ['Finance', 'Development Sector', 'Sales', 'Analytic Quality', 'Technical Support', 'Reception'],
          cities = ['Seattle', 'Tacoma', 'Kirkland', 'Redmond', 'London', 'Philadelphia', 'New York', 'Seattle', 'London', 'Boston'],
          titles = ['Accountant', 'Vice President, Sales', 'Sales Representative', 'Technical Support', 'Sales Manager', 'Web Designer',
                    'Software Developer'],
          status = ['Away', 'Online', 'Offline', 'Busy'],
          year = [1970, 1975, 1980, 1998, 1999, 2000, 2005, 2010, 2012, 2015, 2020, 2025, 2030, 2032, 2035, 2040, 2050];

    return Array(count).fill({}).map((_, idx) => ({
        id: idx + 1,
        firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
        lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
        city: cities[Math.floor(Math.random() * cities.length)],
        title: titles[Math.floor(Math.random() * titles.length)],
        year: year[Math.floor(Math.random() * year.length)],
        status: status[Math.floor(Math.random() * status.length)],
        avatar: 'https://cdn2.iconfinder.com/data/icons/avatar-2/512/oscar_boy-256.png'
      })
    );
  }

}
