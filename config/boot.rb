ENV['BUNDLE_GEMFILE'] ||= File.expand_path('../Gemfile', __dir__)
ENV['MONGODB_URI'] = 'mongodb://heroku_rb2xg6pm:mm7d4h077apns278jn69o8ooa5@ds253857.mlab.com:53857/heroku_rb2xg6pm'

require 'bundler/setup' # Set up gems listed in the Gemfile.
require 'bootsnap/setup' # Speed up boot time by caching expensive operations.
