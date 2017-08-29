/**
 * Created by Eugene on 2017/3/23.
 */
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // pkg: grunt.file.readJSON('package.json'),
        jshint: {
            src: 'src/js/babel/es6.js'
        },
        uglify: {
            // options: {
            //     banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            // },
            build: {
                src: 'src/js/babel/es6.js',
                dest: 'dist/js/babel/es6.min.js'
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['uglify']);

};