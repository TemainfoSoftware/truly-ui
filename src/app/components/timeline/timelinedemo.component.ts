/*
  MIT License

  Copyright (c) 2018 Temainfo Software

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
import { Component } from '@angular/core';

import * as json from './timelinedemo-dataproperties.json';
import * as jsonEvts from './timelinedemo.dataevents.json';

@Component({
  selector: 'app-timeline',
  templateUrl: './timelinedemo.component.html',
  styleUrls: ['./timelinedemo.component.scss'],
})
export class TimelineDemoComponent {

  public dataTableProperties;

  public dataEvents;

  public timeout;

  public dataLazy;

  public take = 20;

  public dataBasic = [
    {
      title: 'Dr. Fábio dos Santos 1',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos 2',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos 3',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos 4',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos 5',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos 6',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos 7',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos 8',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos 9',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos 10',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos 11',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos 12',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos 13',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos 14',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos 15',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos 16',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos 17',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos 18',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos 19',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos 20',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos 21',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos 22',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos 23',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos 24',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos 25',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos 26',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos 27',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos 28',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos 29',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos 30',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos 31',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos 32',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos 32',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos 33',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos 34',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos 35',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos 36',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos 37',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos 38',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos 39',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }, {
      title: 'Dr. Fábio dos Santos',
      date: 1537477718000,
      text: 'Mauris vulputate dolor vel finibus sagittis.',
      duration: 15,
      category: [
        {
          title: 'Anamnese',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        },
        {
          title: 'Evolução',
          text: 'Mauris vulputate dolor vel finibus sagittis.'
        }
      ]
    }
  ];

  constructor() {
    this.dataTableProperties = json.dataProperties;
    this.dataEvents = jsonEvts.dataEvents;

    this.dataLazy = {
      'data' : this.getDataFromService(0, this.take),
      'total' : this.dataBasic.length
    };
  }

  getDataFromService(skip, take) {
    return this.dataBasic.slice(skip, take);
  }

  onLazyLoad(event) {
    clearTimeout( this.timeout );
    this.timeout = setTimeout( () => {
      this.dataLazy = {
        'data': this.getDataFromService( event.skip, event.take ),
        'total': this.dataBasic.length
      };
      // console.log('datalazy', this.dataLazy);
    }, 1000 );
  }

}

