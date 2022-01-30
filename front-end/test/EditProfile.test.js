import React from 'react';
import renderer from 'react-test-renderer';
import {EditProfile} from '../components/profile/EditProfile'

it('renders correctly', async () => {
    const tree = await renderer.create(<EditProfile/>).toJSON();
    expect(tree).toMatchSnapshot();
  });