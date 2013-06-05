/*
 * Copyright (c) 2013 Mauricio Wolff
 *
 * This software is provided 'as-is', without any express or implied
 * warranty. In no event will the authors be held liable for any damages
 * arising from the use of this software.
 *
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 *
 *    1. The origin of this software must not be misrepresented; you must not
 *    claim that you wrote the original software. If you use this software
 *    in a product, an acknowledgment in the product documentation would be
 *    appreciated but is not required.
 *
 *    2. Altered source versions must be plainly marked as such, and must not
 *    be misrepresented as being the original software.
 *
 *    3. This notice may not be removed or altered from any source
 *    distribution.
 */

/*global console, process, require */

var fs = require('fs'),
    jshint = require('jshint').JSHINT,
    buildpath = (__dirname.indexOf('\\') > -1) ? __dirname + '\\' : __dirname + '/',
    options = JSON.parse(fs.readFileSync(buildpath + 'options.js', null).toString()),
    curfile = process.argv[2];

if (!curfile) {
    errorLog('File needs to be saved before you can use JSHint-Inline.');
    return;
}

var curfilename = (curfile.indexOf('/') > -1) ? curfile.split('/') : curfile.split('\\');
    curfilename = curfilename[curfilename.length - 1];

var html = fs.readFileSync(curfile, null).toString() || false;

var errorLog = function (msg) {
    console.log('✗ ' + msg);
};

if (html) {
    html = html.toString();
} else {
    errorLog("Couldn't get any content from this file... File: " + curfile);
    return;
}
global =1
var cheerio = require('cheerio');
var $ = cheerio.load(html);

var $script_tags = $('script');

if (!$script_tags.length) {
    errorLog("This file doesn't have any <script> tags... Are you sure you're in the right tab? This one is: " + curfile);
    return;
}

var script_lines = [];

html.split('\n').forEach(function (str, i) {
    if (str.indexOf('<script') > -1) {
        script_lines.push(i);
    }
});

var jsh_counter = 0;
var jsh_errors = 0;

$script_tags.each(function () {
    var source = this.html();

    try {
        jshint(source, options);
    } catch(e) {}

    if (jshint.errors) {

        function numberWang(wangaNumb) {
            var
            thatsNumberWang = 5 - wangaNumb,
                stayNumberWang = '',
                i;

            for (i = 0; i < thatsNumberWang; i += 1) {
                stayNumberWang += ' ';
            }

            return stayNumberWang;
        }

        jsh_errors += jshint.errors.length;

        jshint.errors.forEach(function(e) {
            // if the error is null, then we could not continue (too many errors)
            if (e === null) {
              errorLog("Stopping, unable to continue.");
              return;
            }

            // get the raw error data
            var raw = e.raw;

            // do some formatting if the error data is available
            if ("undefined" !== typeof raw) {
                var code = ' (' + e.code + ')';
                var line = e.line + script_lines[jsh_counter];
                errorLog(
                [
                    curfilename, " - ",
                    line, ":",
                    e.character, " ",
                    raw.replace("{a}", e.a).
                    replace("{b}", e.b).
                    replace("{c}", e.c).
                    replace("{d}", e.d),
                    code
                ].join(""));
            }
        });
    }
    jsh_counter++;
});

if (jsh_errors === 0) {
    console.log('✓ JSHint PASSED');
} else {
    var plural = (jsh_errors > 1) ? 's' : '';
    console.log('✗ JSHint FAILED (' + jsh_errors + ' error' + plural + ' found)');
}