import React from 'react';
import renderer from 'react-test-renderer';
import {ResetPassword} from '../components/profile/ResetPassword'

it('renders correctly', async () => {
    const tree = await renderer.create(<ResetPassword/>).toJSON();
    expect(tree).toMatchSnapshot();
  });