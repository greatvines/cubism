cubism_contextPrototype.cube = function(host) {
  if (!arguments.length) host = "";
  var source = {},
      context = this,
      credentials;

  source.metric = function(expression) {
    return context.metric(function(start, stop, step, callback) {
      var xhr = d3.json(host + "/1.0/metric"
          + "?expression=" + encodeURIComponent(expression)
          + "&start=" + cubism_cubeFormatDate(start)
          + "&stop=" + cubism_cubeFormatDate(stop)
          + "&step=" + step);
      if (credentials) {
        xhr.header('Authorization', credentials);
      }
      xhr.get(function(error, data) {
        if (error) return callback(new Error("unable to load data"));
        callback(null, data.map(function(d) { return d.value; }));
      });
    }, expression += "");
  };

  // Returns the Cube host.
  source.toString = function() {
    return host;
  };

  source.credentials = function(creds) {
    credentials = creds;
  };

  return source;
};

var cubism_cubeFormatDate = d3.time.format.iso;
