var fs = require("fs");
var path = require("path");
var util = require("util");
var exec = require("child_process").exec;

var request = require("request");

module.exports = function(conf) {

    if (!conf.password || !conf.username) {
        throw "Please provide a username and password to MatchEngine.";
    }

    conf.server = conf.server || "matchengine.tineye.com";

    var ME = {
        url: "http://" + conf.username + ":" +
            encodeURIComponent(conf.password) +
            "@" + conf.server + "/" + conf.username + "/rest/",

        handle: function(callback) {
            return function(err, res, body) {
                if (!callback) {
                    return;
                }

                if (err || res.statusCode !== 200) {
                    return callback(err);
                }

                var data = JSON.parse(body);
                callback(null, data.result || data);
            };
        },

        del: function(id, callback) {
            request(ME.url + "delete/?filepaths[0]=" + id,
                 ME.handle(callback));
        },

        list: function(callback) {
            request(ME.url + "list/?limit=0", ME.handle(callback));
        },

        similar: function(file, callback) {
            request.post({
                url: ME.url + "search/",
                form: { filepath: file, limit: 0 }
            }, ME.handle(callback) );
        },

        urlSimilar: function(url, callback) {
            request.post({
                url: ME.url + "search/",
                form: { url: url, limit: 0 }
            }, ME.handle(callback) );
        },

        add: function(files, dir, callback) {
            if (!(files instanceof Array)) {
                files = [files];
            }

            // TODO: Switch this to using the request module instead of curl
            var args = files.map(function(file, i) {
                return util.format("-F 'images[%s]=@%s' -F 'filepaths[%s]=%s'",
                    i, file, i, (dir ? dir + "/" : "") + path.basename(file));
            }).join(" ");

            var cmd = "curl " + ME.url + "add/ " + args;

            exec(cmd, callback);
        }
    };

    return ME;
};
