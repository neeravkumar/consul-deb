require 'uglifier'

File.open("static/application.min.js", "w") {|file| file.truncate(0) }

libs = [
  "javascripts/libs/jquery-1.10.2.min.js",
  "javascripts/libs/handlebars-1.1.2.min.js",
  "javascripts/libs/ember-1.5.1.min.js",
  "javascripts/libs/ember-validations.min.js",
]

app = [
  "javascripts/app/router.js",
  "javascripts/app/models.js",
  "javascripts/app/routes.js",
  "javascripts/app/controllers.js",
  "javascripts/app/views.js",
  "javascripts/app/helpers.js",
]

libs.each do |js_file|
  File.open("static/application.min.js", "a") do |f|
    puts "cat #{js_file}"
    f << File.read(js_file)
  end
end

app.each do |js_file|
  File.open("static/application.min.js", "a") do |f|
    puts "compile #{js_file}"
    f << Uglifier.compile(File.read(js_file))
  end
end
