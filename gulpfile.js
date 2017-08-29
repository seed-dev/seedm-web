/**
 * Created by Eugene on 2017/3/23.
 */
var gulp = require('gulp');
var plumber = require('gulp-plumber');//异常处理（发生错误不终止进程）
var balen = require('gulp-babel');//JS文件编译工具，可支持浏览器上下兼容JS新语法特性
var concat = require('gulp-concat');//合并文件
var rename = require('gulp-rename');//重命名
var del = require('del');//删除文件或文件夹
var imagemin = require('gulp-imagemin');//压缩图片
var sass = require('gulp-sass');//Sass编译
var cleancss = require('gulp-clean-css');//压缩CSS文件
var jshint = require('gulp-jshint');//JS文件语法严格程度检测
var ugilfy = require('gulp-uglify');//JS文件压缩
var htmlmin = require('gulp-htmlmin');
var fileSync = require('gulp-file-sync');
var watch = require('gulp-watch');//监听文件变化时执行指定任务
var connect = require('gulp-connect')//实时监控资源变化，自动刷新浏览器
var browsersync = require('browser-sync').create();//浏览器实时，快速响应文件变化

gulp.task('jshint', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('imagemin', ['clean'], function () {
    return gulp.src('src/images/**/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
});

/* JS处理 */
//打包
gulp.task('jsmin', ['imagemin'], function () {
    return gulp.src('src/js/**/*.js')
        .pipe(balen({presets: ['es2015']}))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(ugilfy())
        .pipe(gulp.dest('dist/js'));
});

/* CSS处理 */
//编译
gulp.task('sass', function () {
    return gulp.src('src/sass/**/*.scss')
        .pipe(plumber({
            errorHandler: function () {
                this.emit('end');//非常重要，如果取消此行代码，异常出错时watch进程虽然不会挂了，但文件变化时，会导致不进行自动编译
            }
        }))
        .pipe(sass())
        .pipe(gulp.dest('src/css'));
});

//打包
gulp.task('cssmin', ['jsmin'], function () {
    return gulp.src('src/css/**/*.css')
        .pipe(rename({suffix: '.min'}))
        .pipe(cleancss())
        .pipe(gulp.dest('dist/css'));
});

/* HTML处理 */
//打包
gulp.task('htmlmin', ['cssmin'], function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };

    return gulp.src('src/html/**/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/html'));
});
//页面刷新
gulp.task('html', function() {
    gulp.src('src/html/**/*.html')
        .pipe(connect.reload());
});

gulp.task('clean', function () {
    return del(['dist/images', 'dist/css', 'dist/js', 'dist/html']);
});

/* 整体处理任务 */
gulp.task('watch', function () {
    // gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('src/css/**/*.css', ['html']);
    // gulp.watch('src/js/**/*.js', ['html']);
    gulp.watch('src/html/**/*.html', ['html']);
});

gulp.task('reload', function () {
    connect.server({
        root: ['src'],
        port: 8888,
        livereload: true
    });
});

// gulp.task('server', function () {
//     gulp.src('dist')
//         .pipe(webserver({
//             livereload: true,
//             directoryListing: true,
//             open: true
//         }));
// });

// gulp.task('server', function () {
//     // 建立即时重整伺服器
//     livereload.listen();
//
//     // 看守所有位在 dist/  目录下的档案，一旦有更动，便进行重整
//     gulp.watch(['dist/**']).on('change', function(file) {
//         livereload.changed(file.path);
//     });
// });

gulp.task('build', ['htmlmin']);

gulp.task('default', ['sass', 'watch', 'reload']);