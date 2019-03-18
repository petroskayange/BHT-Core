var GlobalProperty = function GlobalProperty() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return {
    isEnabled: function isEnabled(property, success, fail) {
      var url = options.path + '/global_properties?property=' + property;
      GET({
        url: url,
        async: true,
        headers: {
          Authorization: options.authToken
        }
      }, {}, function (data) {
        success(data[property] === 'true')
      }, function (error) {
        fail(error);
      });
    }
  };
};