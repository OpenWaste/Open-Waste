import React from 'react';
import renderer from 'react-test-renderer';
import {LogIn} from '../components/profile/components/LogIn'

it('renders correctly', async () => {
    const tree = await renderer.create(<LogIn/>).toJSON();
    expect(tree).toMatchSnapshot();
  });