node-matchengine
================

Node module for using the TinEye MatchEngine API.

    var ME = require("matchengine");
    
    ME.add("test.jpg", "test", function() {
        ME.similar("test/test.jpg", function(err, data) {
            console.log("Similar images:");
            data.result.forEach(function(item) {
                console.log(" - ", item.filepath);
            });
        });
    });

API
===

* add
* del
* list
* similar
* urlSimilar