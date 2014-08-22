module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    connect: {
      server: {
        options: {
          port: 8008,
          keepalive: true,
          hostname: "localhost",
          base: "app"
        }   
      }   
    }   
  }); 

  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.registerTask("server", ["connect"]);
  grunt.registerTask("serve", ["server"]);
  grunt.registerTask("default", ["server"]);
}
