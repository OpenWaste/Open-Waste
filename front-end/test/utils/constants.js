export const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

export const fakeNavigation = {
    navigate: jest.fn(),
    addListener:jest.fn((val,val2) => {return jest.fn()})
};
