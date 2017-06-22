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
      },
      normalize: {
        files: [{
          expand: true,
          cwd: 'node_modules/normalize.css/',
          src: 'normalize.css',
          dest: 'build/css/'
        }]
      }
    },

    less: {
      style: {
        files: {
          'build/css/style.css': 'less/style.less'
        }
      }
    },

    browserSync: {
      build: {
        bsFiles: {
          src: [
            'build/*.html',
            'build/css/*.css'
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
      },
      style: {
        files: 'less/**/*.less',
        tasks: [
          'less'
        ],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.registerTask('build', [
    'clean',
    'copy',
    'less'
  ]);

  grunt.registerTask('serve', [
    'browserSync',
    'watch'
  ]);
};
