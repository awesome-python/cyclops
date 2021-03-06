/**
 * The contents of this file are subject to the CYPHON Proprietary Non-
 * Commercial Registered User Use License Agreement (the "Agreement”). You
 * may not use this file except in compliance with the Agreement, a copy
 * of which may be found at https://github.com/dunbarcyber/cyclops/. The
 * developer of the CYPHON technology and platform is Dunbar Security
 * Systems, Inc.
 *
 * The CYPHON technology or platform are distributed under the Agreement on
 * an “AS IS” basis, WITHOUT WARRANTY OF ANY KIND, either express or
 * implied. See the Agreement for specific terms.
 *
 * Copyright (C) 2017 Dunbar Security Solutions, Inc. All Rights Reserved.
 *
 * Contributor/Change Made By: ________________. [Only apply if changes
 * are made]
 */

// Vendor
import { resolve } from 'path';
import {
  optimize,
  Configuration,
  Plugin,
  Rule,
  Loader,
  DefinePlugin,
  SourceMapDevToolPlugin,
} from 'webpack';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';

// Local
import {
  MAIN_CSS_FILE,
  WEBPACK_OUTPUT_PUBLIC_PATH,
  WEBPACK_OUTPUT_PATH,
  WEBPACK_OUTPUT_FILENAME,
} from './cyclops.config';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/**
 * Dictionary of possible environments paired with a function that
 * returns that environments plugins.
 */
type PluginAssignments = { [environment: string]: () => Plugin[] };

// --------------------------------------------------------------------------
// Constants
// --------------------------------------------------------------------------

/**
 * Current running environment.
 * @type {string}
 */
const ENV = process.env.NODE_ENV || 'development';

/**
 * If webpack is being run in a production environment.
 * @type {boolean}
 */
const PRODUCTION = ENV === 'production';

/**
 * If webpack is being run in a test environment.
 * @type {boolean}
 */
const TESTING = ENV === 'test';

/**
 * If webpack is being run in a development environment.
 * @type {boolean}
 */
const DEVELOPMENT = ENV === 'development';

// --------------------------------------------------------------------------
// Loaders
// --------------------------------------------------------------------------

/**
 * Webpack loader for typescript files.
 * @type {Object}
 */
const TYPESCRIPT_LOADER: Loader = {
  loader: 'awesome-typescript-loader',
  options: {
    configFileName: resolve(__dirname, 'src/tsconfig.json'),
  },
};

/**
 * Webpack loader for CSS files.
 * @type {Object}
 */
const CSS_LOADER: Loader = {
  loader: 'css-loader',
  options: {
    minimize: PRODUCTION,
    sourceMap: PRODUCTION,
  },
};

// --------------------------------------------------------------------------
// Rules
// --------------------------------------------------------------------------

const JS_SOURCEMAP_RULE: Rule = {
  test: /\.js$/,
  enforce: 'pre',
  use: ['source-map-loader'],
};

const TS_SOURCEMAP_RULE: Rule = {
  test: /\.tsx?$/,
  enforce: 'pre',
  use: ['source-map-loader'],
};

/**
 * Webpack rule for CSS files.
 * @type {Object}
 */
const CSS_RULE: Rule = {
  test: /\.css$/,
  use: [
    'style-loader',
    'css-loader',
  ],
};

/**
 * Webpack rule for Typescript files.
 * @type {Object}
 */
const TYPESCRIPT_RULE: Rule = {
  test: /\.tsx?$/,
  include: resolve(__dirname, 'src'),
  use: [
    TYPESCRIPT_LOADER,
  ],
};

/**
 * Webpack rule for sass files.
 * @type {Object}
 */
const SCSS_RULE: Rule = {
  test: /\.scss$/,
  include: resolve(__dirname, 'src/styles'),
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      CSS_LOADER,
      'sass-loader',
    ],
  }),
};

/**
 * Webpack rule for generating code coverage.
 * @type {Object}
 */
const COVERAGE_RULE: Rule = {
  test: /\.tsx?$/,
  enforce: 'post',
  include: resolve(__dirname, 'src/app'),
  exclude: /\.spec\.tsx?$/,
  use: ['istanbul-instrumenter-loader'],
};

/**
 * Rules that are used no matter the environment
 * @type {Rule[]}
 */
const BASE_RULES: Rule[] = [
  JS_SOURCEMAP_RULE,
  TS_SOURCEMAP_RULE,
  CSS_RULE,
  TYPESCRIPT_RULE,
  SCSS_RULE,
];

/**
 * Rules that are used in a test environment.
 * @type {Rule[]}
 */
const TEST_RULES: Rule[] = [
  COVERAGE_RULE,
];

/**
 * Rules used in the webpack configuration.
 * @type {Rule[]}
 */
const RULES: Rule[] = TESTING
  ? BASE_RULES.concat(TEST_RULES)
  : BASE_RULES;

// --------------------------------------------------------------------------
// Plugins
// --------------------------------------------------------------------------

/**
 * Plugins that are used no matter the environment.
 * @type {Plugin[]}
 */
const BASE_PLUGINS: Plugin[] = [
  new ExtractTextPlugin(MAIN_CSS_FILE),
];

/**
 * Plugins that are used in a testing environment.
 * @type {Plugin[]}
 */
const TEST_PLUGINS: Plugin[] = [
  new SourceMapDevToolPlugin({
    filename: null, // if no value is provided the sourcemap is inlined
    test: /\.(tsx?|js)($|\?)/i, // process .js and .ts files only
  }),
];

/**
 * Plugins to add in a production environment.
 * @type {Plugin[]}
 */
const PRODUCTION_PLUGINS: Plugin[] = [
  new DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  }),
  new optimize.UglifyJsPlugin({ sourceMap: true }),
];

/**
 * Plugins specific to each environment.
 * @type {PluginAssignments}
 */
const PLUGIN_ASSIGNMENTS: PluginAssignments = {
  development: () => BASE_PLUGINS,
  production: () => BASE_PLUGINS.concat(PRODUCTION_PLUGINS),
  test: () => BASE_PLUGINS.concat(TEST_PLUGINS),
};

/**
 * Plugins used in the webpack configuration.
 * @type {Plugin[]}
 */
const PLUGINS: Plugin[] = PLUGIN_ASSIGNMENTS[ENV]();

// --------------------------------------------------------------------------
// Configuration
// --------------------------------------------------------------------------

/**
 * Webpack configuration.
 * @type {Object}
 */
const config: Configuration = {
  context: __dirname,

  entry: './src/main.ts',

  output: TESTING ? undefined : {
    filename: WEBPACK_OUTPUT_FILENAME,
    path: WEBPACK_OUTPUT_PATH,
    publicPath: WEBPACK_OUTPUT_PUBLIC_PATH,
  },

  resolve: {
    extensions: [
      '.js',
      '.ts',
      '.tsx',
      '.json',
    ],
    alias: {
      '~': resolve(__dirname, 'src/app/'),
    },
  },

  devtool: TESTING || DEVELOPMENT ? 'inline-source-map' : 'source-map',

  module: {
    rules: RULES,
    noParse: /(mapbox-gl)\.js$/,
  },

  externals: {
    'react/lib/ReactContext': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/addons': true,
    'mapboxgl': 'mapboxgl',
  },

  plugins: PLUGINS,
};

export default config;
