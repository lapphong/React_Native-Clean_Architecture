module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          shared: './src/shared',
        },
      },
    ],
    'babel-plugin-transform-typescript-metadata',
  ],
};
