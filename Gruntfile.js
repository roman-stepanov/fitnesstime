'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    clean: {
      build: 'build/'
    },

    copy: {
      html: {
        files: [{
          expand: true,
          src: '*.html',
          dest: 'build/'
        }]
      }
    },

    browserSync: {
      build: {
        bsFiles: {
          src: [
            'build/*.html'
          ]
        },
        options: {
          server: 'build/',
          watchTask: true,
          notify: false,
          open: true,
          ui: false
        }
      }
    },

    watch: {
      html: {
        files: '*.html',
        tasks: 'copy:html'
      }
    }
  });

  grunt.registerTask('build', [
    'clean',
    'copy'
  ]);

  grunt.registerTask('serve', [
    'browserSync',
    'watch'
  ]);
};
