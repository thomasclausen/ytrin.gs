const pkg = require('./package.json');

const postcssimport = require('postcss-import');
const postcsspresetenv = require('postcss-preset-env');
const autoprefixer = require('autoprefixer');
const cssmqpacker = require("css-mqpacker");
const purgecss = require('@fullhuman/postcss-purgecss');
const cssnano = require('cssnano');

module.exports = (ctx) => ({
  map: ctx.options.map,
  parser: ctx.options.parser,
  plugins: [
    postcssimport(),
    postcsspresetenv(),
    autoprefixer(),
    cssmqpacker(),
    purgecss({
      content: [pkg.name + '/index.php', pkg.name + '/list.php'],
      css: [pkg.name + '/assets/css/source/' + pkg.name.replace('.', '') + '.css'],
      whitelist: ['js-active', 'js-show']
    }),
    cssnano()
  ]
});
