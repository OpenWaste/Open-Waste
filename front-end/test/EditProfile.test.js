import React from 'react';
import renderer from 'react-test-renderer';
import {EditProfile} from '../components/profile/components/EditProfile'

it('renders correctly', async () => {
    const tree = await renderer.create(<EditProfile/>).toJSON();
    expect(tree).toMatchSnapshot();
  });