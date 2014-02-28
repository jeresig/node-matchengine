node-matchengine
================

Node module for using the TinEye MatchEngine API.

    var ME = require("matchengine")({
        username: "MATCHENGINE_USERNAME",
        password: "MATCHENGINE_PASSWORD"
    });

    ME.add("test.jpg", "test", function() {
        ME.similar("test/test.jpg", function(err, matches) {
            console.log("Similar images:");
            matches.forEach(function(item) {
                console.log(" - ", item.filepath);
            });
        });
    });

Installation
===

    npm install matchengine

API
===

## add(fileName, dirName, callback)

Upload an image file to MatchEngine and put it in the specified directory. For example if you were to upload:

    add("/var/data/test.jpg", "sample")

You should end up with a file with an ID of: `"sample/test.jpg"` in the MatchEngine index.

`fileName` can also be an array of files to upload.

## similar(ID, callback)

Return a list of objects representing other pre-uploaded files which are similar to the specified file ID. For example:

    ME.similar("sample/test.jpg", function(err, matches) {
        matches.forEach(function(match) {
            console.log(match.filepath + " " + match.score + "% match.");
        });
    });

The object returned as a match would look something like this:

    {
        score: '97.60',
        target_overlap_percent: '99.98',
        overlay: 'overlay/?query=sample/test1.jpg&target=sample/test2.jpg&m21=-3.87874e-05&m22=1.00005&m23=-0.0119187&m11=1.00005&m13=-0.00554278&m12=3.87874e-05',
        query_overlap_percent: '100.00',
        filepath: 'sample/test2.jpg'
    }

## urlSimilar(url, callback)

Given the URL of an image, return a list of similar images from the database (in the same format as the `similar()` method). For example:

    ME.urlSimilar("http://test.com/test.jpg", function(err, matches) {
        matches.forEach(function(match) {
            console.log(match.filepath + " " + match.score + "% match.");
        });
    });

The image at the specified URL is not added to the MatchEngine index.

## del(ID, callback)

Given a specified MatchEngine file ID (for example `"sample/test.jpg"`), delete that particular image from the index. It will no longer be returned in the results.

## list(callback)

Returns a list of all the file IDs available in the MatchEngine index. For example:

    ME.list(function(err, ids) {
        ids.forEach(function(id) {
            console.log(id);
        });
    });

Credits
===

Created by [John Resig](http://ejohn.org/).

Released under an MIT license.
