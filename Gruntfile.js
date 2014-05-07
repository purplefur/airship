module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    shell: {
      initDevelopmentDB: {
        command: 'mongo airship data/setup_db.js',
        options: {
          stdout: true,
          stderr: true,
          failOnError: true,
          execOptions: {
            cwd: '.'
          }
        }
      },
      initProductionDB: {
        command: 'mongo ds033818.mongolab.com:33818/airship data/setup_db.js --username daboss --password wham8am8',
        options: {
          stdout: true,
          stderr: true,
          failOnError: true,
          execOptions: {
            cwd: '.'
          }
        }
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('dev', ['shell:initDevelopmentDB', 'nodemon:dev']);
  grunt.registerTask('prod', ['shell:initProductionDB']);

};