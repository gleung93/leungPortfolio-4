module.exports = function(grunt) {

  grunt.initConfig({
    watch: {
      options: {
        livereload: true,
      },
      css: {
        files: 'src/styles/*.scss',
        tasks: ['sass'],
      },
      html: {
        files: '**/*.html'
      },
      js: {
        files: 'src/js/**/*.js',
        tasks: ['concat'],
      },
      configFiles: {
        files: [ 'Gruntfile.js', 'config/*.js' ],
        options: {
          reload: true
        }
      },
    },
    sass: {
      dist: {
        options: {
          style: 'expanded',
          require: 'susy'
        },
        files: {
          'public/style.css': 'src/styles/style.scss'
        }
      }
    },
    connect: {
      server: {
        options: {
          livereload: true,
          port: 9001,
          base: 'public'
        }
      }
    },
    concat: {
      options: {
        sourceMap: true,
      },
      dist: {
        src: [
          'src/js/libraries/angular/angular.js',
          'src/js/libraries/angular/angular-route.js',
          'src/js/libraries/angular/angular-animate.js',
          'src/js/app.js',
          'src/js/services/preloader.js',
          'src/js/directives/grc3d.js'
        ],
        dest: 'public/app.js',
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['connect:server','watch']);

};
