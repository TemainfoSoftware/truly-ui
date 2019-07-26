/*
 *
 *     MIT License
 *
 *     Copyright (c) 2019 Temainfo Sistemas
 *
 *     Permission is hereby granted, free of charge, to any person obtaining a copy
 *     of this software and associated documentation files (the "Software"), to deal
 *     in the Software without restriction, including without limitation the rights
 *     to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *     copies of the Software, and to permit persons to whom the Software is
 *     furnished to do so, subject to the following conditions:
 *     The above copyright notice and this permission notice shall be included in all
 *     copies or substantial portions of the Software.
 *     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *     IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *     AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *     OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *     SOFTWARE.
 * /
 */

import { moduleMetadata, storiesOf } from '@storybook/angular';
import { text, select, withKnobs } from '@storybook/addon-knobs';

import { ButtonModule } from '../../../projects/truly-ui/src/components/button';
import { CoreModule } from '../../../projects/truly-ui/src/components/core';
import { TlButton } from '../../../projects/truly-ui/src/components/button/button';
import { action } from '@storybook/addon-actions';

storiesOf('General|Button', module)
  .addParameters({
    knobs: {
      disableDebounce: true,
    },
  })
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      imports: [
        ButtonModule,
        CoreModule.forRoot({
          theme: 'default',
        }),
      ],
    })
  )

  .add('with text', () => ({
      component: TlButton,
      props: {
        text: 'Hello Button',
        onClick: action('log 1'),
      },
    })
  )
  .add('with color', () => {
    const colors = {
      Primary: 'primary',
      Warning: 'warning',
      Information: 'information',
      Danger: 'danger',
    };
    const textValue = text('text', 'With Color');
    const color = select('color', colors, 'primary');
    return {
      component: TlButton,
      props: {
        text: textValue,
        color: color,
      },
    };
  });
