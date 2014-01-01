module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */',
                beautify: true, // On production turn this option to false
                mangle: false  // On production turn this option to true
            }, //options
            my_target: {
                files: {
                    '_assets/js/scripts.min.js': ['_assets/devComps/js/**/*.js']
                } //files
            } //my_target
        }, //uglify
        compass : {
            dev : {
                options : {
                    config : 'config.rb'
                } //options
            } //dev
        }, //compass
        watch : {
            options : { livereload : true },
            jsTasks : {
                files : ['_assets/devComps/js/**/*.js'],
                tasks : ['uglify']
            }, //jsTasks
            sassTasks : {
                files : ['_assets/devComps/sass/*.scss'],
                tasks : ['compass:dev']
            }, //sassTasks
            htmlTasks : {
                files : ['*.html']
            }
        } //watch
    }); //initConfig
    
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    
    grunt.registerTask('default', 'watch');
}; //exports