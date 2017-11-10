import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Dashboard from '../src/dashboard'

it('remove element from document list', () => {
  const docList = shallow(<DocumentList  />);
  
  expect(2 + 2).toBe(4);
});