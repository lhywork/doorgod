var gulp = require('gulp'),
    del = require('del'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint'),
    minifycss = require('gulp-minify-css'), //css压缩
// var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create(); 
var paths = {
    src: './',
    js: 'js/',
    css: 'css/'
};
var dist = {
    js: 'dist/js/',
    css:'dist/css/'
}
//压缩,合并 js
gulp.task('minifyjs', function () {
    return gulp.src(paths.src + 'js/*.js') //需要操作的文件
        // .pipe(rename({
        //     suffix: '.min'
        // }))
        .pipe(uglify()) //压缩
        .pipe(gulp.dest(dist.js)) //输出
        .pipe(browserSync.stream());
});
// 合并、压缩、重命名css
gulp.task('css', function () {
    return gulp.src(paths.src + 'css/*.css')
        .pipe(concat('main.css'))
        // .pipe(autoprefixer({
        //     browsers: ['last 5 versions', 'Android >= 4.0'],
        //     cascade: true, //是否美化属性值 默认：true 像这样：
        //     //-webkit-transform: rotate(45deg);
        //     //        transform: rotate(45deg);
        //     remove:false //是否去掉不必要的前缀 默认：true 
        // }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())
        .pipe(gulp.dest(dist.css))
        .pipe(browserSync.stream());
});

// clean
gulp.task('clean', function () {
    return del('dist/');
});

//默认命令,在cmd中输入gulp后,执行的就是这个任务(压缩js需要在检查js之后操作)
gulp.task('build', ['minifyjs','css'], function () {
});

gulp.task('s', ['build'], function() {
    browserSync.init({server: "./" });
    // gulp.watch([paths.js + '/**/*.js'], ['minifyjs']);
    // gulp.watch([paths.css + '/**/*.css'], ['css']);
    gulp.watch("*.html").on('change', browserSync.reload);
});
// default 默认任务，依赖清空任务  
gulp.task('default', ['clean'], function() {  
    gulp.start('serve');  
});  