const gulp = require("gulp");
const browserify = require("browserify");
const source = require('vinyl-source-stream');
const rename = require('gulp-rename');
const tsify = require("tsify");
const watchify = require("watchify");
const gutil = require("gulp-util");
const glob = require('glob');
const es = require('event-stream');
const buffer = require('vinyl-buffer');

gulp.task("copy-css", () => {
  const paths = {
    styles: ['css/*.css']
  };
  return gulp.src(paths.styles)
    .pipe(gulp.dest("dist/css"));
});

gulp.task("default", ["copy-css"], (done) => {
  glob('./src/*.ts', (err, files) => {
    if (err) {
      done(err);
    }

    const tasks = files.map(entry => {
      const taskFile = browserify({
        basedir: '.',
        debug: true,
        entries: [entry],
        cache: {},
        packageCache: {}
      })
      .plugin(tsify)
      .plugin(watchify);

      const bundle = () => {
        return taskFile.bundle()
          .pipe(source(entry))
          .pipe(buffer())
          .pipe(rename({
            extname: '.bundle.js'
          }))
          .pipe(gulp.dest("dist"));
      };

      taskFile.on('update', bundle);
      taskFile.on("log", gutil.log);
      return bundle();
    })
    es.merge(tasks).on('end', done);
  });
});
