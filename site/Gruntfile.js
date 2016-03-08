/**
 * Build File - Create a build to concat JS, Sass, and coordinate
 *
 */
module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		config: grunt.file.readJSON('grunt_config.json'),
		indexfile : 'index.html',

		/**
		 * Lint files to check for common JS errors
		 * Override dot notation in Gruntfile for exception (because of how concat will work)
		 */
		jshint: {
			uses_defaults : ['assets/js/core/**/*.js', 'package.json', '!assets/js/core/compiled-templates.js', '!assets/js/core/placeholder.js'],
			options : {
				curly: true,
				eqeqeq: true,
				eqnull : true,
				browser: true,
				globals : {
					jQuery : true
				},
				reporter: require('jshint-stylish')
			},
			with_overrides : {
				options : {
					sub:true,
					reporter: require('jshint-stylish')
				},
				files: {
					src:['Gruntfile.js']
				}
			}
		},

		uglify : {
			dev : {
				files : {
					'<%= config.source_files.javascript %>/startup.min.js' : ['tmp/concat/startup.js'],
					'<%= config.source_files.javascript %>/core.min.js' : ['tmp/concat/core.js'],
					'<%= config.source_files.javascript %>/jsapp-core.min.js' : ['tmp/concat/jsapp-core.js']
				}
			},
			prod : {
				files : {
					'<%= config.dest_files.javascript %>/startup.min.js' : ['tmp/concat/startup.js'],
					'<%= config.dest_files.javascript %>/core.min.js' : ['tmp/concat/core.js'],
					'<%= config.dest_files.javascript %>/jsapp-core.min.js' : ['tmp/concat/jsapp.js']
				}
			}
		},

		copy : {
			prod : {
				files : [{
					expand: true,
					cwd: '../site/',
					src: ['package.json', 'Gruntfile.js', 'index.html', 'assets/js/core/compiled-templates.js'],
					dest: '../dist/'
				}]
			}
		},

		concat: {
			groups: {
				files: {
					'tmp/concat/startup.js' : ['<%= startupFiles %>'],
					'tmp/concat/jsapp.js'   : ['<%= jsappFiles %>'],
					'tmp/concat/core.js'    : ['<%= coreFiles %>']
					
				}
			}
		},

		compress: {
			prod : {
				options: {
					archive : '../dist.zip',
					mode: 'zip'
				},
				files : [{
					src : ['../dist/**', '../dist/Gruntfile.js', '../dist/package.json']
				}]
			}
		},

		compass: {                  // Task
			prod: {                   // Target
				options: {              // Target options
					sassDir: 'assets/sass',
					cssDir: 'assets/css',
					environment: 'production',
					output: 'compact'
				}
			},
			dev: {                    // Another target
				options: {
					sassDir: 'assets/sass',
					cssDir: 'assets/css'
				}
			}
		},

		cssmin : {
			prod : {
				files : {
					'../dist/assets/css/main.min.css' : ['assets/css/**/*.css']
				}
			},
			dev : {
				files : {
					'assets/css/main.min.css' : ['assets/css/**/*.css']
				}
			}
		},

		replace : {
			prod : {
				options : {
					patterns :  [ 
						{
							match : /<!--begin startup-->[\s\S]*?<!--end startup-->/gi,
							replacement : function() {
								return '<script type="text/javascript" src="assets/js/concat/startup.min.js"></script>';
							}
						},
						{
							match : /<!--begin core-->[\s\S]*?<!--core end-->/gi,
							replacement : function() {
								return '<script type="text/javascript" src="assets/js/concat/core.min.js"></script>';
							}		
						},
						{
							match : /<!--begin jsapp-->[\s\S]*?<!--end jsapp-->/gi,
							replacement : function() {
								return '<script type="text/javascript" src="assets/js/concat/jsapp-core.min.js"></script>';
							}
						},
						{
							match : /<!--cssmain begin-->[\s\S]*?<!--cssmain end-->/gi,
							replacement : function() {
								return '<link rel="stylesheet" href="assets/css/main.min.css">';
							}
						},
						{
							match : /<!--template begin-->[\s\S]*?<!--template end-->/gi,
							replacement : function() {
								return '<script type="text/javascript" src="assets/js/core/compiled-templates.js"></script>';
							}
						}
					]
				},
				files : [{
					expand : true,
					cwd : '../dist',
					src: ['index.html'],
					dest: '../dist'					
				}]
			}
		},

		clean : {
			beforeProd : {
				src : ['./dist/', './dist.zip', 'assets/css/*.css']
			},
			prod : {
				src : ['tmp/', 'assets/js/concat/']
			},
			dev : {
				src : ['tmp/']
			}
		},

		jst : {
			compile: {
				options: {
					namespace : "Templates",
					templateSettings: {
						variable : 'data'
					},
					processName: function(filename) {
						var templateID = '';

						var dropPath = filename.slice(filename.lastIndexOf("/") + 1, filename.length);
						templateID = dropPath.slice(0, dropPath.indexOf("."));

						return templateID;
					}
				},
				files : {
					"assets/js/core/compiled-templates.js" : ["assets/js/core/templates/**/*.html"]
				}
			}
		},

		watch : {
			jshint : {
				files : ['<%= jshint.files %>'],
				tasks : ['jshint', 'uglify:dev', 'preprocess:dev']
			},
			buildcss : {
				files : ['assets/**/*.scss'],
				tasks : ['compass:dev']
			},
			compile : {
				files : ['assets/**/*.scss', 'assets/js/core/templates/**/*.html'],
				tasks : ['compass:dev', 'jst']
			}
		}
	});

	grunt.registerTask('default', []);

	grunt.registerTask('buildsass', ['compass:dev']);

	grunt.registerTask('buildJS', ['jshint','uglify:dev']);

	grunt.registerTask('build',
		['clean:beforeProd',
		'jshint',
		'getFilesForConcat',
		'concat:groups',
		'uglify:prod',
		'jst',
		'compass:prod',
		'cssmin:prod',
		'copy',
		'replace:prod',
		'compress:prod',
		'clean:prod'
		]);

	grunt.registerTask('testing',[
		'jshint',
		'getFilesForConcat',
		'concat',
		'uglify:dev',
		'clean:dev'
		]);

	grunt.registerTask('getFilesForConcat', 'Dynamically Grab Files for Concat', function() {
			// Return configs
			var prefix = 'assets/js/';
			var targetPath = 'assets/js/';

			var parseIndexFileAndCreateGroups = function() {
				var data = parseData(grunt.file.read(grunt.config.get('indexfile')));

				grunt.log.writeln(JSON.stringify(data, null, 2));

				grunt.config.set('startupFiles', data['startup']);
				grunt.config.set('jsappFiles', data['jsapp']);
				grunt.config.set('coreFiles', data['core']);
				return data;
			};

			var parseData = function(data) {

				var cleanData = data.replace(/(\n|\r)/g, '');
				var hash = {};

				// Just match a script tag with the attribute build-into
				var expression = /(<script[\s]+build\-into[^<>]*>)/g;
				var matches = cleanData.match(expression);

				if (matches) {
					for (var i = 0; i < matches.length; i++) {
						
						var scriptTag = matches[i];
						var buildIntoMatch = scriptTag.match(/build\-into=\"([^\"]*)\"/);
						
						var srcMatch = scriptTag.match(/src=\"([^\'']*)\"/);

						if (!srcMatch || !buildIntoMatch) {
							continue;
						}
						
						var src = srcMatch[1];
						var buildInto = buildIntoMatch[1];

						hash[buildInto] = hash[buildInto] || []; 
						var offset = src.indexOf(prefix) + prefix.length;
						
						hash[buildInto].push(targetPath + '/' + src.substring(offset));

					}
				}
				grunt.log.writeln(JSON.stringify(grunt.config.get('startupFiles'), null, 2));
				return hash;
			};
			parseIndexFileAndCreateGroups();
		});

};