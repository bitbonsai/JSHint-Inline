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

(function() {

    var fs = require('fs');
    var jshint = require('jshint').JSHINT;
    var options = JSON.parse(fs.readFileSync(process.argv[3], null).toString());

    var filepath = process.argv[2];

    if (!filepath) {
        errorLog('File needs to be saved before you can use JSHint-Inline.');
        return;
    }

    var justfile = filepath.replace(/.*?[\\|\/]/g, '');

    var html = fs.readFileSync(filepath, null);

    var errorLog = function (msg) {
        console.log('✗ ' + msg);
    };

    if (html) {
        html = html.toString();
    } else {
        errorLog("Couldn't get any content from this file... File: " + filepath);
        return;
    }

    var cheerio = require('cheerio');
    var $ = cheerio.load(html);

    var $script_tags = $('script');

    if (!$script_tags.length) {
        errorLog("This file doesn't have any <script> tags... Are you sure you're in the right tab? This one is: " + filepath);
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

            jsh_errors = jshint.errors.length;

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
                    var line = e.line + script_lines[jsh_counter];
                  errorLog([justfile, ":",
                       line, ":",
                       e.character, " ",
                       raw.replace("{a}", e.a).
                           replace("{b}", e.b).
                           replace("{c}", e.c).
                           replace("{d}", e.d)].join(""));
                }
                });
        }
        jsh_counter++;
    });

    if (jsh_errors === 0) {
        console.log('✓ JSHint PASSED');
    } else {
        console.log('✗ JSHint FAILED');
    }
})();