const { preprocessTypescript } = require('@nrwl/cypress/plugins/preprocessor');

module.exports = (on, config) => {
  on('file:preprocessor', preprocessTypescript(config, customizeWebpackConfig));
  return config;
}

function customizeWebpackConfig(webPackConfig) {
  webPackConfig.node = {
    fs: "empty",
    child_process: "empty",
    readline: "empty",
  };

  pushFeature(webPackConfig);
  pushFeatures(webPackConfig);

  return webPackConfig;
}

function pushFeature(webPackConfig) {
  pushModuleRule(webPackConfig, /\.feature$/, 'cypress-cucumber-preprocessor/loader');
}

function pushFeatures(webPackConfig) {
  pushModuleRule(webPackConfig, /\.features$/, 'cypress-cucumber-preprocessor/lib/featuresLoader');
}

function pushModuleRule(webPackConfig, testRegex, loaderLib) {
  webPackConfig.module.rules.push({
   test: testRegex,
   use: [{ loader: loaderLib }]
  });
}