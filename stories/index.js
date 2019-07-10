import React from 'react';
import { storiesOf } from '@storybook/react';
import { doc } from 'storybook-readme';

import { HelloWorld } from 'src';

import Readme from '../README.md';

storiesOf('Documentation', module)
  .add('Readme', doc(Readme));

storiesOf('Core', module)
  .add('HelloWorld', () => (
    <HelloWorld />
  ));
