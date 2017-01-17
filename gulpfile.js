//import node modules
const gulp = require('gulp')
const rename = require('gulp-rename')

const sass = require('gulp-sass')
const nano = require('gulp-cssnano')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')

const named = require('vinyl-named')
const webpack = require('webpack')
const gwp = require('webpack-stream')
const webpackConfig = require('./temp-client/webpack.config.js')

const isDev = process.env.NODE_ENV === 'development'

const path = {
  'styles': {
    'dir': './temp-client/styles/scss',
    'entry': './temp-client/styles/scss/styles.scss',
    'dest': './temp-client/dist'
  },
  'js': {
    'dir': './temp-client/js',
    'entry': './temp-client/js/index.js',
    'dest': './temp-client/dist',
  }
}

// task STYLES

gulp.task('styles', () => gulp.src(path.styles.entry)
  .pipe(sass({
    includePaths: [
      __dirname + '/node_modules/normalize-scss/sass',
    ],
  }))  
  .pipe(autoprefixer())
  .pipe(nano())
  .pipe(rename('styles.min.css'))
  .pipe(gulp.dest(path.styles.dest))
)

gulp.task('styles-dev', () => gulp.src(path.styles.entry)
  .pipe(sourcemaps.init())
  .pipe(sass({
    includePaths: [
      __dirname + '/node_modules/normalize-scss/sass',
    ],
  }))
  .pipe(autoprefixer())
  .pipe(rename('styles.css'))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest(path.styles.dest))
)

gulp.task('styles-watch', () => gulp.watch(`${path.styles.dir}/**`, ['styles-dev']))

// task JS

gulp.task('js', () => gulp.src(path.js.entry)
  .pipe(named(() => isDev ? 'bundle' : 'bundle.min'))
  // .pipe(webpack(webpackConfig))
  .pipe(gwp(webpackConfig, webpack))
  .pipe(gulp.dest(path.js.dest))
)

// task DEFAULT

const tasks = ['styles', 'js']
const devTasks = ['styles', 'js', 'styles-watch']

gulp.task('default', isDev ? devTasks : tasks)
