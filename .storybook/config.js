import '@storybook/addon-console';
import { configure, addDecorator } from '@storybook/react';
import { withPropsTable } from 'storybook-addon-react-docgen';
import { withKnobs } from '@storybook/addon-knobs';

addDecorator(withPropsTable);
addDecorator(withKnobs);

function loadStories() {
  require('../stories'); // eslint-disable-line global-require
}
configure(loadStories, module);
