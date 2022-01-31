import React from 'react';
import renderer from 'react-test-renderer';
import {VerifyEmail} from '../components/profile/components/VerifyEmail'

it('renders correctly', async () => {
    const tree = await renderer.create(<VerifyEmail/>).toJSON();
    expect(tree).toMatchSnapshot();
  });