import React from 'react';
import renderer from 'react-test-renderer';
import {ForgotPassword} from '../components/profile/components/ForgotPassword'

it('renders correctly', async () => {
    const tree = await renderer.create(<ForgotPassword/>).toJSON();
    expect(tree).toMatchSnapshot();
  });