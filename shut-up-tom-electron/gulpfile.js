const gulp = require("gulp");
const browserify = require("browserify");
const source = require('vinyl-source-stream');
const rename = require('gulp-rename');
const tsify = require("tsify");

gulp.task("copy-html", () => {
  const paths = {
    pages: ['view/*.html']
  };
  return gulp.src(paths.pages)
    .pipe(gulp.dest("dist"));
});

gulp.task("default", ["copy-html"], () => {
  const files = [
    'src/dashboard.ts',
    'src/index.ts'
  ]
  files.map(entry => {
    return browserify({
      basedir: '.',
      debug: true,
      entries: [entry],
      cache: {},
      packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source(entry))
    .pipe(rename({
      extname: '.bundle.js'
    }))
    .pipe(gulp.dest("dist"));
  })
});
