JSHint-Inline
=============

JSHint HTML files or other files that contains `<script>` tags. Requires node.js

The node modules are included into package. 

Just add it to Sublime and choose `Tools > Build System > JSHint-inline`

Use `⌘ + B` or `⌃ + B` to check all script tags on your HTML file.

### JSHint Options ###
They are located on a file called `options.js`. 

You can override it using JSHint comments like `/*global jQuery, console */`

To find your options file, you can open Package Manager with `⌘ + ⇧ + P` or `⌃ + ⇧ + P` and type `Pack`. Select `Preferences: Browse Packages`. Or Go to menu `Preferences > Browse Packages`.

### Test file ###
I've included a file called `test.html` with 2 script tags just for testing.

### Install Node ###
Just click on the _install_ button on [nodejs.org](http://nodejs.org/)

Questions, doubts, comments? Raise an __issue__
