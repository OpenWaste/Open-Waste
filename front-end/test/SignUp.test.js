import React from 'react';
import renderer from 'react-test-renderer';
import {SignUp} from '../components/profile/components/SignUp'

it('renders correctly', async () => {
    const tree = await renderer.create(<SignUp/>).toJSON();
    expect(tree).toMatchSnapshot();
  });