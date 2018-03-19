var api = (function() {
  var module = {};

  module.signin = function(username, password, callback) {
    send('GET', '/api/hello/', null, callback);
  };

  return module;
})();
