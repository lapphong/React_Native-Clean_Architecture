module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          app: './src/app',
          assets: './src/assets',
          data: './src/data',
          domain: './src/domain',
          initializer: './src/initializer',
          presentation: './src/presentation',
          shared: './src/shared',
        },
      },
    ],
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', {legacy: true}],
  ],
};
