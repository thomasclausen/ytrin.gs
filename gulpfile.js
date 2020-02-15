const pkg = require('./package.json');

const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const changed = require('gulp-changed');
const rename = require('gulp-rename');
const watch = require('gulp-watch');

const postcss = require('gulp-postcss');
const postcssimport = require('postcss-import');
const autoprefixer = require('autoprefixer');
const postcsspresetenv = require('postcss-preset-env');
const cssmqpacker = require("css-mqpacker");
const cssnano = require('cssnano');

const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

const imagemin = require('gulp-imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');

const styles = pkg.name + '/assets/css/source/' + pkg.name.replace('.', '') + '.css';
const scripts = pkg.name + '/assets/js/source/' + pkg.name.replace('.', '') + '.js';
const scriptsOther = [
  '!' + pkg.name + '/assets/js/source/' + pkg.name.replace('.', '') + '.js',
  pkg.name + '/assets/js/source/*.js'
];
const images = pkg.name + '/assets/images/source/*';

gulp.task('styles', () => {
  const plugins = [
    postcssimport(),
    autoprefixer({
      browsers: pkg.browserslist
    }),
    postcsspresetenv({
      browsers: pkg.browserslist
    }),
    cssmqpacker(),
    cssnano()
  ];

  gulp.src(styles)
    .pipe(postcss(plugins))
    .pipe(rename({
      basename: pkg.name.replace('.', ''),
      suffix: '.min'
    }))
    .pipe(gulp.dest(pkg.name + '/assets/css'));
});

gulp.task('scripts', () => {
  const presets = [
    ['@babel/preset-env', {
      'targets': {
        browsers: pkg.browserslist
      }
    }]
  ];
  const plugins = [
    '@babel/plugin-transform-arrow-functions',
    '@babel/plugin-external-helpers'
  ];

  gulp.src(scripts)
    .pipe(babel({
      babelrc: false,
      presets: presets,
      plugins: plugins
    }))
    .pipe(uglify())
    .pipe(rename({
      basename: pkg.name.replace('.', ''),
      suffix: '.min'
    }))
    .pipe(gulp.dest(pkg.name + '/assets/js'));

  gulp.src(scriptsOther)
    .pipe(babel({
      babelrc: false,
      presets: presets,
      plugins: plugins
    }))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(pkg.name + '/assets/js'));
});

gulp.task('images', () => {
  gulp.src(images)
    .pipe(changed(pkg.name + '/assets/images'))
    .pipe(imagemin([
      imagemin.gifsicle(),
      mozjpeg({
        quality: '75'
      }),
      pngquant({
        quality: '100'
      }),
      imagemin.svgo({
        plugins: [{
          removeViewBox: false
        }]
      })
    ], {
      progressive: true,
      verbose: true
    }))
    .pipe(gulp.dest(pkg.name + '/assets/images'));
});

gulp.task('watch', () => {
  gulp.watch(pkg.name + '/assets/css/source/**/*.css', ['styles']);
  gulp.watch(pkg.name + '/assets/js/source/**/*.js', ['scripts']);
  gulp.watch(pkg.name + '/assets/images/source/*', ['images']);
});

gulp.task('default', () => {
  gulp.start('styles', 'scripts', 'images');
});
