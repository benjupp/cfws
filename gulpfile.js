var gulp = require("gulp");
var concat = require("gulp-concat");
var inline = require('gulp-inline');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var templateCache = require('gulp-angular-templatecache');
var rev = require('gulp-rev');
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean');
var notify = require('gulp-notify');
var ngAnnotate = require('gulp-ng-annotate');
var runSequence = require('run-sequence');
var htmlreplace = require('gulp-html-replace');
var inline = require('gulp-inline-source');


var local_base = './local/'

gulp.task('clean.all', function () {
    return gulp.src(['./app/*'])
        .pipe(clean({
            read: false
        }));
});

gulp.task('clean.tmp', function () {
    return gulp.src([
        './app/ugly.js',
        './app/annotated.js',
        './app/templates.js',
        './app/index.html'
    ])
        .pipe(clean({
            read: false
        }))
});


gulp.task('copy-statics', function () {
    gulp.src(local_base + 'public/index.html')
        .pipe(gulp.dest('./app'));

    gulp.src([
        local_base + 'public/assets/css/fonts/**',
    ], {
        "base": "./local/public/assets/css/fonts"
    })
        .pipe(gulp.dest('./app/public/fonts'))

    gulp.src(local_base+ 'public/partials/**',
    {
        "base" : "./local/public/partials"
    })
    .pipe(gulp.dest("./app/public/partials"))

})

gulp.task('copy-node-app', function () {
    return gulp.src([
        local_base + 'app.js',
        local_base + 'package.json',
        local_base + 'routes/**',
        local_base + 'node_modules/**',
    ], {
        "base": "./local"
    })
        .pipe(gulp.dest('./app'))
});

//gulp.task('cache-templates', function () {
//    return gulp.src(local_base + 'public/partials/wods.html')
//        .pipe(templateCache())
//        .pipe(gulp.dest('./app'));
//})

gulp.task('annotate', function () {
    return gulp.src([
        local_base + 'public/assets/js/angular.min.js',
        local_base + 'public/assets/js/angular-route.js',
        local_base + 'public/assets/js/angular-animate.min.js',
        './app/templates.js',
        local_base + 'public/main.js'
    ])
        .pipe(ngAnnotate())
        .pipe(concat('annotated.js'))
        .pipe(uglify({
            mangle: false
        }))
        .pipe(gulp.dest('./app'));
})

gulp.task('uglify', function () {
    return gulp.src([
        local_base + 'public/assets/js/mapstyles.js',
        local_base + 'public/assets/js/jquery.min.js',
        local_base + 'public/assets/js/lodash.min.js',
        local_base + 'public/assets/js/skroller.min.js',
        local_base + 'public/assets/js/smoothscroll.min.js',
        local_base + 'public/assets/js/jquery.flexslider-min.js',
        local_base + 'public/assets/js/modernizr.js',
        local_base + 'public/assets/js/quote-rotator.js',
        local_base + 'public/assets/js/moment.js',
     ])
        .pipe(uglify({
            mangle: false
        }))
        .pipe(concat('ugly.js'))
        .pipe(gulp.dest('./app'))
})

gulp.task('js', function () {
    return gulp.src([
            './app/ugly.js',
            './app/annotated.js'
         ])
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest('./app/public'))
})

gulp.task('css', function () {
    return gulp.src(local_base + 'public/assets/css/*.css')
        .pipe(autoprefixer())
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(concat('main.min.css'))
        .pipe(gulp.dest('./app/public'));
});


gulp.task('prepare-index', function () {
    return gulp.src('./app/index.html')
        .pipe(htmlreplace({
            'css': {
                src: 'main.min.css',
                tpl: '<link rel="stylesheet" href="%s" inline/>'
            },
            'js': {
                src: 'main.min.js',
                tpl: '<script src="%s"/></script>'
            }
        }))
        .pipe(gulp.dest('./app/public'));
})

gulp.task('inline-source', function () {
    return gulp.src('./app/public/index.html')
        .pipe(inline({
            compress: false
        }))
        .pipe(gulp.dest('./app/public/'))
})


gulp.task('build', function () {
    return runSequence(
        
        'clean.all',
        //'cache-templates',
        'copy-statics',
        'css',
        'annotate',
        'uglify',
        'js',
        'prepare-index',
        'inline-source',
        'copy-node-app',
        'clean.tmp'
        
    );
})