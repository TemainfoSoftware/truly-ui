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
import { text, select, boolean, number, color } from '@storybook/addon-knobs';

import { ButtonModule } from '../../../projects/truly-ui/src/components/button';
import { CoreModule } from '../../../projects/truly-ui/src/components/core';
import { IconsModule } from '../../../projects/truly-ui/src/components/icons';

const Story = storiesOf('General|Button', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        ButtonModule,
        IconsModule,
        CoreModule.forRoot({
          theme: 'default',
        }),
      ],
    })
  );

Story.add('Overview', () => {
  const textValue = text('Text', 'With Color');
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
  }, []);

  return {
    template: `
      <tl-button
        [text]="text"
        [isLoading]="isLoading"
        [width]="width+'px'"
        [height]="height+'px'"
        [color]="color"
        [loaderColor]="loaderColor"
        [disabled]="isDisable"
        [flatBorder]="flatBorder"
        [colorIconBefore]="colorIconBefore"
        [colorIconAfter]="colorIconAfter"
        [iconAfterText]="iconOn.includes('iconAfterText') ? icon : null"
        [iconBeforeText]="iconOn.includes('iconBeforeText') ? icon : null"
        [iconAddonAfter]="iconOn.includes('iconAddonAfter') ? icon : null"
        [iconAddonBefore]="iconOn.includes('iconAddonBefore') ? icon : null"
        [textLoading]="textToLoading">
      </tl-button>`,

    props: {
      height: height,
      width: width,
      text: textValue,
      flatBorder: isFlatBorder,
      color: colorButton,
      colorIconBefore: colorIconBefore,
      colorIconAfter: colorIconAfter,
      loaderColor: loaderColor,
      isDisable: isDisable,
      isLoading: isLoading,
      textToLoading: textToLoading,
      icon: icon,
      iconOn: iconOn,
    },
  };
});

Story.add('Basic', () => ({
    template: `<tl-button [text]="text"></tl-button>`,
    props: {
      text: 'Hello World',
    }
  })
);

Story.add('Colors', () => ({
    template: `
      <div style="display: flex; width: 530px; justify-content: space-between;">
        <tl-button [text]="'Basic'" [color]="'basic'"></tl-button>
        <tl-button [text]="'Primary'" [color]="'primary'"></tl-button>
        <tl-button [text]="'Success'" [color]="'success'"></tl-button>
        <tl-button [text]="'Danger'" [color]="'danger'"></tl-button>
        <tl-button [text]="'Warning'" [color]="'warning'"></tl-button>
        <tl-button [text]="'Information'" [color]="'information'"></tl-button>
      </div>`,
  })
);

Story.add('Only Icon', () => ({
    template: `
      <ng-template #icon>
        <div style="padding: 0 10px">
          <tl-icon  [lib]="'fa'" [style]="'fas'">home</tl-icon>
        </div>
      </ng-template>
      <div style="display: flex; width: 300px; justify-content: space-between;">
        <tl-button width="'40px'" [template]="icon" [color]="'basic'"></tl-button>
        <tl-button width="'40px'" [template]="icon" [color]="'primary'"></tl-button>
        <tl-button width="'40px'" [template]="icon" [color]="'success'"></tl-button>
        <tl-button width="'40px'" [template]="icon" [color]="'danger'"></tl-button>
        <tl-button width="'40px'" [template]="icon" [color]="'warning'"></tl-button>
        <tl-button width="'40px'" [template]="icon" [color]="'information'"></tl-button>
      </div>`,
  })
);

Story.add(' Icon Addon', () => ({
    template: `
      <p><tl-button [text]="'Icon Addon Before'" [iconAddonBefore]="'fas fa-print'" ></tl-button></p>
      <p><tl-button [text]="'Icon Addon After'" [iconAddonAfter]="'fas fa-print'"></tl-button></p>`,
  })
);

Story.add(' Icon Inside', () => ({
    template: `
      <p><tl-button [text]="'Icon Before Text'" [iconBeforeText]="'fas fa-print'" ></tl-button></p>
      <p><tl-button [text]="'Icon After Text'" [iconAfterText]="'fas fa-print'"></tl-button></p>`,
  })
);

Story.add('Dimensions', () => ({
    template: `
      <p><tl-button [text]="'Width Example'" [width]="'125px'"></tl-button></p>
      <p><tl-button [text]="'Height Example'" [height]="'40px'" ></tl-button></p>`,
  })
);

Story.add('Loading Button', () => {
  const label = 'Loading ?';
  const value = boolean(label, false);
  return {
    template: `<tl-button [isLoading]="isLoading"
                [color]="'primary'"
               [text]="'Save'"
               [textLoading]="'Saving'"></tl-button>`,
    props: {
      isLoading: value,
    }
  };
});


Story.add('With Template', () => ({
    template: `
      <ng-template #icon>
        <div style="padding: 0 10px">
          <span style="padding-right: 10px">With Template</span> 
          <tl-icon  [lib]="'fa'" [style]="'fas'">home</tl-icon>
        </div>
      </ng-template>
      
      <div style="display: flex; width: 300px; justify-content: space-between;">
        <tl-button width="'40px'" [template]="icon" [color]="'basic'"></tl-button>
      </div>`,
  })
);
