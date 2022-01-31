import React from 'react';
import renderer from 'react-test-renderer';
import {ProfileNavigator} from '../components/profile/components/ProfileNavigator'

it('renders correctly', async () => {
    const tree = await renderer.create(<ProfileNavigator/>).toJSON();
    expect(tree).toMatchSnapshot();
  });