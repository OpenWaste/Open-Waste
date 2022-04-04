import React from 'react';
import renderer from 'react-test-renderer';
import {Registration} from '../components/profile/components/Registration'

describe("Registration Tests", () => {
    it('renders correctly', () => {
        const tree = renderer.create(<Registration/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
