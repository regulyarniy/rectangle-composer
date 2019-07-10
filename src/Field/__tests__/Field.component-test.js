import 'jest-styled-components';

import React from 'react';
import { mount } from 'enzyme';

import Field from '../Field.component';

describe('component <HelloWorld />', () => {
  it('should render correctly', () => {
    mount(<Field />);
  });
});
