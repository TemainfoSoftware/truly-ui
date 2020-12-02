/*
 *
 *     MIT License
 *
 *     Copyright (c) 2020 Temainfo Sistemas
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

import {moduleMetadata, storiesOf} from '@storybook/angular';
import { text, select, boolean, number, color } from '@storybook/addon-knobs';

import {CoreModule} from '../../../projects/truly-ui/src/components/core';
import {InputModule} from '../../../projects/truly-ui/src/components/input';


const Story = storiesOf('Data Entry|Input Text', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        InputModule,
        CoreModule.forRoot({
          theme: 'default',
        }),
      ],
    })
  );

Story.add('Overview', () => {
  const label = text('Label', 'Price');

  const textBefore = text('Text Before', '$');
  const textAfter = text('Text After', 'Dollars');

  const iconBefore = text('icon Before', '');
  const iconAfter = text('icon After', '');

  const mask = text('Mask', '');
  const placeholder = text('Placeholder', 'Type Something');

  const clearButton = boolean('Clear Button', false);
  const readonly = boolean('Readonly', false);
  const required = boolean('Required', false);
  const disabled = boolean('Disabled', false);

  const autocomplete = select('Autocomplete', {
    Off: 'off',
    On: 'on'
  }, 'off');

  const maxlength = number('Max Length', -1);
  const tabindex = number('TabIndex', 0);
  const height = number('Height', 23);

  const labelPlacement = select('Label Placement',  {
    Top: 'top',
    Left: 'left',
  }, 'left');
  const textAlign = select('Text Align',  {
    Left: 'left',
    Right: 'right',
    Center: 'center',
    Justify: 'justify',
  }, 'left');
  const labelSize = number('Label Size', 100);
  const inputColor = select('Color',  {
    Basic: 'basic',
    Primary: 'primary',
    Warning: 'warning',
    Information: 'information',
    Danger: 'danger',
  }, 'basic');
/*  const textValue = text('Text', 'With Color');
  const icon = text('Icon', 'ion ion-md-log-in');
  const textToLoading = text('Loading Text', 'Saving');

  const loaderColor = color('Loader Color', '#CCC');
  const colorIconBefore = color('Color Icon After', '');
  const colorIconAfter = color('Color Icon Before', '');

  const isLoading = boolean('Loading', false);
  const isDisable = boolean('Disable', false);
  const isFlatBorder = boolean('Flat Border', false);

  const width = number('Width', 130, {
    range: true,
    min: 50,
    max: 500,
    step: 10,
  });
  const height = number('Height', 30, {
    range: true,
    min: 30,
    max: 500,
    step: 10,
  });

  const colorButton = select('Color',  {
    Primary: 'primary',
    Warning: 'warning',
    Information: 'information',
    Danger: 'danger',
  }, 'primary');
  const iconOn = select('Icon Placement', {
    None: [],
    IconAfterText: ['iconAfterText'],
    IconBeforeText: ['iconBeforeText'],
    IconAddonAfter: ['iconAddonAfter'],
    IconAddonBefore: ['iconAddonBefore'],
    OnlyIconsText: ['iconAfterText', 'iconBeforeText'],
    OnlyIconsAddons: ['iconAddonAfter', 'iconAddonBefore'],
    AllIcons: ['iconAddonAfter', 'iconAddonBefore', 'iconAfterText', 'iconBeforeText'],
  },*/
  return {
    template: `
      <tl-input
        [label]="label"
        [textBefore]="textBefore"
        [textAfter]="textAfter"
        [labelPlacement]="labelPlacement"
        [labelSize]="labelSize + 'px'"
        [textAlign]="textAlign"
        [color]="color"
        [iconBefore]="iconBefore"
        [iconAfter]="iconAfter"
        [clearButton]="clearButton"
        [readonly]="readonly"
        [required]="required"
        [disabled]="disabled"
        [autocomplete]="autocomplete"
        [maxlength]="maxlength"
        [tabindex]="tabindex"
        [mask]="mask"
        [placeholder]="placeholder"
        [height]="height + 'px'"
        >
      </tl-input>`,

    props: {
      label: label,
      textAfter: textAfter,
      textBefore: textBefore,
      labelPlacement: labelPlacement,
      labelSize: labelSize,
      textAlign: textAlign,
      color: inputColor,
      iconBefore: iconBefore,
      iconAfter: iconAfter,
      clearButton: clearButton,
      readonly: readonly,
      required: required,
      disabled: disabled,
      autocomplete: autocomplete,
      maxlength: maxlength,
      tabindex: tabindex,
      mask: mask,
      placeholder: placeholder,
      height: height
    },
  };
});
