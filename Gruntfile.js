module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jsbeautifier: {
            files: ["index.js", "Gruntfile.js", "public/*.js", "public/*.html", "public/*.css", "!public/libs", "!public/css/jquery-ui.min.css", "!public/css/bootstrap-editable.min.css", "!public/css/bootstrap.min.css", "!public/css/font-awesome.min.css"],
            options: {}
        }
    });
    grunt.loadNpmTasks("grunt-jsbeautifier");
    grunt.registerTask('default', ['jsbeautifier'])
}
