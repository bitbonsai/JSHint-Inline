JSHint-Inline
=============

JSHint HTML files or other files that contains `<script>` tags.

**Prerequisites:** [NodeJS](http://nodejs.org)

Just add it to Sublime using [WBond's Package Manager](https://sublime.wbond.net/packages/JSHint%20Inline).

To set the Build System and run JSHint-Inline, use the shortcut, `⌃ + ⇧ + J`

or... choose `Tools > Build System > JSHint-Inline` and hit `⌘ + B` or `⌃ + B` to check all script tags on your HTML file.

### JSHint Options ###
They are located on a variable `options`. Default:

	{ 	
		"browser": true, 
		"globalstrict": true, 
		"smarttabs": true, 
		"debug": true, 
		"strict": true, 
		"unused": true, 
		"undef": true, 
		"curly": true 
	}

You can override it using JSHint comments like `/*global jQuery, console */` or `/* jshint -W007, node */`

To find your options file, you can open Package Manager with `⌘ + ⇧ + P` or `⌃ + ⇧ + P` and type `Pack`. Select `Preferences: Browse Packages`. Or Go to menu `Preferences > Browse Packages`. Go to `JSHint-Inline`. The file is there.

### Test file ###
I've included a file called `test.html` with 2 script tags just for testing. You can open a terminal and run `node jshinline test.html` or open it with Sublime and run the build.

### Install Node ###
Just click on the _install_ button on [http://nodejs.org](http://nodejs.org/)

Questions, doubts, comments? Raise an [issue](https://github.com/bitbonsai/JSHint-Inline/issues)

#### Extra Notes ####
To have the nice success (✓) and error (✗) signs on Sublime's console, you need a font that supports it. If you're on a mac, no problem. For Windows I recommend [DejaVu Sans Mono](http://dejavu-fonts.org/wiki/Main_Page)

####Run JSHint on save

Install [SublimeOnSaveBuild](https://github.com/alexnj/SublimeOnSaveBuild)

### License
MIT: http://bitbonsai.mit-license.org