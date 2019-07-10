import '@storybook/addon-console';
import { configure, addDecorator } from '@storybook/react';

const { withPropsTable } = require('storybook-addon-react-docgen');

addDecorator(withPropsTable);

function loadStories() {
  require('../stories'); // eslint-disable-line global-require
}
configure(loadStories, module);
