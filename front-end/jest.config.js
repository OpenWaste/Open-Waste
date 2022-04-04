module.exports = {
  preset: "jest-expo/android",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  "transformIgnorePatterns": [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)"
  ],
  "moduleNameMapper": {
    "\\.(css|less)$": "identity-obj-proxy"
  },
  "transform": {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/test/utils/assetsTransformer.js"
  },
  "setupFiles": [
    "<rootDir>/jest/setup.js"
  ],
};
