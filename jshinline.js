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

/* globals console, process, require, __dirname */

var fs = require('fs'),
    jshint = require('jshint').JSHINT,

    buffer = '',
    buildpath = (__dirname.indexOf('\\') > -1) ? __dirname + '\\' : __dirname + '/',
    code,
    curfile = process.argv[2],
    curfilename,
    html,
    jsh_counter = 0,
    jsh_errors = [],
    line;
    match,
    options = JSON.parse(fs.readFileSync(buildpath + 'options.js', null).toString()),
    re = /<script\b[^>]*>([\s\S]*?)<\/script>/gm,
    script_lines = [],
    script_tags = 0,
    source = '',

var errorLog = function (msg) {
    'use strict';

    console.log('✗ ' + msg);
};

if (!curfile) {
    errorLog('File needs to be saved before you can use JSHint-Inline.');
    return;
}

curfilename = (curfile.indexOf('/') > -1) ? curfile.split('/') : curfile.split('\\');
curfilename = curfilename[curfilename.length - 1];

html = fs.readFileSync(curfile, null).toString() || false;

if (html) {
    html = html.toString();
} else {
    errorLog("Couldn't get any content from this file... File: " + curfile);
    return;
}

html.split('\n').forEach(function (str, i) {
    'use strict';

    if (str.indexOf('<script') > -1) {
        script_lines.push(i);
    }
});

buffer += '[JSHint Inline: ' + curfile + ']\n\n';

while (match = re.exec(html)){
    script_tags++;
    source = match[1];

    try {
        jshint(source, options);
    } catch(e) {}

    if (jshint.errors) {
        jshint.errors.forEach(function(e) {
            'use strict';

            // if the error is null, then we could not continue (too many errors)
            if (e === null) {
              errorLog('Stopping, unable to continue. Too many errors.');
              return;
            }

            // do some formatting if the error data is available
            if ("undefined" !== typeof e.raw) {
                code = ' (' + e.code + ')';
                line = e.line + script_lines[jsh_counter] - 1;
                
                jsh_errors.push('  ' + line + ',' + e.character + ': ' + e.reason + code);
            }
        });
    }
    jsh_counter++;
}

if (script_tags === 0) {
    errorLog('Stopping, unable to continue. This html file does not have any <script> tag.');
    return;
}

if (!jsh_errors.length) {
    buffer += '✓ JSHint PASSED! 0 errors, [esc] to hide.\n';
} else {
    var plural = (jsh_counter > 1) ? 's' : '';
    buffer += jsh_errors.join('\n');
    buffer += '\n\n';
    buffer += '✗ JSHint FAILED\n  ' + jsh_counter + ' warning'+ plural +'/error' + plural + ' detected.\n';
    buffer +=  '\n';
}

console.log(buffer);