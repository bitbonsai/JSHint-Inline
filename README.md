JSHint-Inline
=============

JSHint HTML files or other files that contains `<script>` tags.

**Prerequisites:** [NodeJS](http://nodejs.org) and [jshint](https://github.com/jshint/jshint)

##Install jshint with npm

    npm install -g jshint

Just add it to Sublime and choose `Tools > Build System > JSHint-inline`

Use `⌘ + B` or `⌃ + B` to check all script tags on your HTML file.

** Or use the new shortcut, `⌃ + ⇧ + J` **

### JSHint Options ###
They are located on a file called `options.js`.

You can override it using JSHint comments like `/*global jQuery, console */`

To find your options file, you can open Package Manager with `⌘ + ⇧ + P` or `⌃ + ⇧ + P` and type `Pack`. Select `Preferences: Browse Packages`. Or Go to menu `Preferences > Browse Packages`. Go to `JSHint-Inline`. The file is there.

### Test file ###
I've included a file called `test.html` with 2 script tags just for testing.

### Install Node ###
Just click on the _install_ button on [nodejs.org](http://nodejs.org/)

Questions, doubts, comments? Raise an __issue__

#### Extra Notes ####
To have the nice success (✓) and error (✗) signs on Sublime's console, you need a font that supports it. If you're on a mac, no problem. For Windows I recommend [DejaVu Sans Mono](http://dejavu-fonts.org/wiki/Main_Page)

####Run JSHint on save

Install [SublimeOnSaveBuild](https://github.com/alexnj/SublimeOnSaveBuild)