import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => {
    const Reanimated = require('react-native-reanimated/mock');

    // The mock for `call` immediately calls the callback which is incorrect
    // So we override it with a no-op
    Reanimated.default.call = () => {};

    return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

global.__reanimatedWorkletInit = jest.fn();

jest.mock('@gorhom/bottom-sheet', () => {
    const RN = require('react-native');

    return {
        __esModule: true,
        default: RN.View, // mocks the BottomSheet
        namedExport: {
            ...require('react-native-reanimated/mock'),
            ...jest.requireActual('@gorhom/bottom-sheet'),
        },
    };
});
