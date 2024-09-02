const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const cleanCss = require('gulp-clean-css');
const copy = require('gulp-copy');
const replace = require('gulp-replace');
const browserSync = require('browser-sync');
const tsc = require('gulp-typescript');

gulp.task('styles', () => {
    return gulp.src('src/sass/**/*.scss')
        .pipe(sass())
        .pipe(cleanCss())
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('styles:dev', () => {
    return gulp.src('src/sass/**/*.scss')
        .pipe(sass())
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('assets', () => {
    return gulp.src('src/assets/**/*')
        .pipe(copy('dist', { prefix: 2 }));
});

gulp.task('scripts', () => {
    return gulp.src('src/scripts/**/*.ts')
        .pipe(
            tsc({
                noImplicitAny: true,
                target: 'ES6',
                isolatedModules: true
            })
        )
        .pipe(replace(/\sfrom "(\.\/[^"]+)"/g, ' from "$1.js"'))
        .pipe(gulp.dest('dist/scripts'));
});

gulp.task('html:dev', () => {
    return gulp.src('src/*.html')
            .pipe(gulp.dest('dist'));
});

gulp.task('html', () => {
    return gulp.src('src/*.html')
        .pipe(replace('styles.css', 'styles.min.css'))
        .pipe(gulp.dest('dist'));
});

gulp.task('json', () => {
    return gulp.src('src/*.json')
        .pipe(gulp.dest('dist'));
})

gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    });

    gulp.watch('src', gulp.series('build:dev')).on('change', browserSync.reload);
});

gulp.task('build:dev', gulp.series('styles:dev', 'assets', 'scripts', 'json', 'html:dev'));

gulp.task('default', gulp.series('styles', 'assets', 'scripts', 'json', 'html'));