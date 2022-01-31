import React from 'react';
import renderer from 'react-test-renderer';
import {Profile} from '../components/profile/components/Profile'

it('renders correctly', async () => {
    const tree = await renderer.create(<Profile/>).toJSON();
    expect(tree).toMatchSnapshot();
  });