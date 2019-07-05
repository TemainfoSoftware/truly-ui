import { storiesOf } from '@storybook/angular';
import { Welcome } from '@storybook/angular/demo';

storiesOf('Welcome', module).add('to Storybook', () => ({
  component: Welcome,
  props: {},
}));
