'use strict';
/*

Usage: ./grunt

Documentation
-------------

- jshint is performed against all javascript files located in the current and 'routes' directories
- watch is executed: jshint is performed against *.js file that has changed since the start of watch

Expected outcome of the command line:
-------------------------------------

     Running "jshint:gruntfile" (jshint) task
     >> 1 file lint free.

     Running "jshint:app" (jshint) task
     >> 9 files lint free.

     Running "watch" task
     Waiting...

*/


module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' + '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' + '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' + ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        home_app: '.',
        // Task configuration.
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            app: {
                src: ['<%= home_app %>/*.js', '<%= home_app %>/routes/**/*.js']
            }
        },
        watch: {
            //every time a file is changed, a task is performed
            gruntfile: {
                files: ['<%= jshint.app.src %>', '<%= jshint.gruntfile.src %>'],
                tasks: ['jshint:gruntfile', 'jshint:app' ]
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task.
    grunt.registerTask('default', ['jshint', 'watch']);
};