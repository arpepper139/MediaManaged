# MediaManaged

[![Build Status](https://codeship.com/projects/4d62c360-e59e-0135-6987-1ebfb90962bb/status?branch=master)](https://codeship.com/projects/4d62c360-e59e-0135-6987-1ebfb90962bb/status?branch=master)
[![Code Climate](https://codeclimate.com/github/arpepper139/MediaManaged/badges/gpa.svg)](https://codeclimate.com/github/arpepper139/MediaManaged)
[![Coverage Status](https://coveralls.io/repos/github/arpepper139/MediaManaged/badge.svg?branch=master)](https://coveralls.io/github/arpepper139/MediaManaged?branch=master)

Author: Andrew Pepper-Anderson

MediaManaged is an application that allows users to create a collection of all their shows and movies.
Chrome and Safari are fully supported. Mobile and Firefox are supported but remain in development.

To download and optimally run MediaManaged, you will need:
* An API Key from the OMDb API: http://www.omdbapi.com
* An Amazon Web Services S3 Bucket for photo uploading
* The ImageMagick command line dependency for resizing uploaded photos, which can be installed using Homebrew and the following command:
  `brew install imagemagick`
* The Postgres application

To install the project please run the following commands: 
```
bundle install
npm install
rake db:create
rake db:migrate
```

To start up the website after installation, please run `npm start`, and then in a seperate tab run `rails s`. At that point the website should be accessible at http://localhost:3000 in your browser.

Alternatively, Media Managed may be visited at https://media-managed.herokuapp.com/

Thank you for viewing this project!
