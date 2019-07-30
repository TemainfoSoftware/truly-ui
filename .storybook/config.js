import { configure, addDecorator, addParameters } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { centered } from '@storybook/addon-centered/angular';

// Knobs
addParameters({
  knobs: {
    disableDebounce: true,
  },
});
addDecorator(withKnobs);
//addDecorator(centered);

// automatically import all files ending in *.stories.ts
const req = require.context('../src/stories/', true, /\.stories\.ts$/);
function loadStories() {
  req.keys().sort().forEach(filename => req(filename));
}

configure(loadStories, module);
