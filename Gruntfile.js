const grunt = require('grunt');

grunt.loadNpmTasks('grunt-aws-lambda');
grunt.loadNpmTasks('grunt-es6-import-validate');

grunt.initConfig({
  lambda_invoke: {
    custom_options: {
      options: {
        file_name: 'dist/index.js',
        event: 'event.json'
      }
    }
  }
});
