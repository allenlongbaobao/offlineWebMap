module.exports = function(grunt) {
  'use strict';
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('server', ['connect:server', 'open:server', 'watch:server']);
  var pkg = grunt.file.readJSON('package.json');
  var cfg = {
	src: 'src/app',
	serverHost: '0.0.0.0',
	serverPort: 9000,
	livereload: 45729
  };

  grunt.initConfig({
	pkg: pkg,
	cfg: cfg,
	connect: {
	  options: {
				 port: cfg.serverPort,
				 hostname: cfg.serverHost,
				 livereload: 45729,
			   },
		server: {
				  options: {
							 base: ['src/app']
						   }
				}
	},
	open: {
			server: {
					  url: 'http://localhost:' + cfg.serverPort
					}
		  },
	watch: {
			 options: {
						livereload: cfg.livereload
					  },
			 server: {
					   files: [cfg.src + '/**/**']
					 }
		   }
  });

};
