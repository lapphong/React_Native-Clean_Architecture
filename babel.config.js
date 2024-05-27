module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          shared: './src/shared',
          initializer: './src/initializer',
          domain: './src/domain',
          data: './src/data',
          presentation: './src/presentation',
        },
      },
    ],
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', {legacy: true}],
  ],
};
