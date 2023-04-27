const paths = [
  'module-resolver',
  {
    alias: {
      '@app': './app',
      '@src': './src',
    },
  },
];

/** @type {import('@babel/core').ConfigFunction} */
module.exports = function config(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      paths,
      'react-native-paper/babel',
      require.resolve('expo-router/babel'),
      // fix for web: Export namespace should be first transformed by @babel/plugin-proposal-export-namespace-from
      '@babel/plugin-proposal-export-namespace-from',
      // Reanimated plugin has to be listed last.
      'react-native-reanimated/plugin',
    ],
  };
};
