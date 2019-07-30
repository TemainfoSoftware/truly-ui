import { configure, addDecorator, addParameters } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { centered } from '@storybook/addon-centered/angular';

// Knobs
addDecorator(withKnobs);
addParameters({
  knobs: {
    disableDebounce: true,
  },
});


// Backgrounds
addParameters({
  backgrounds: [
    { name: 'twitter', value: '#00aced', default: true },
    { name: 'facebook', value: '#3b5998' },
  ],
});


// Centered
addDecorator(centered);

// automatically import all files ending in *.stories.ts
const req = require.context('../src/stories/', true, /\.stories\.ts$/);
function loadStories() {
  req.keys().sort().forEach(filename => req(filename));
}

configure(loadStories, module);
