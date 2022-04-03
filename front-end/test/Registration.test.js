import React from 'react';
import renderer from 'react-test-renderer';
import {Registration} from '../components/profile/components/Registration'
jest.useFakeTimers()

describe("Registration Tests", () => {
    it('renders correctly', async () => {
        const tree = await renderer.create(<Registration/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
