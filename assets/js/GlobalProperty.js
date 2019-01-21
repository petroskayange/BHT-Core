var GlobalProperty = function (options = {}) {
  return {
    isEnabled: function (property, success, fail) {
      var url = `${options.path}/global_properties?property=${property}`
      GET(
        {
          url: url,
          async: true,
          headers: {
            Authorization: options.authToken
          }
        },
        {},
        function (data) {
          if (data[property] === 'true') {
            success(true)
          } else {
            success(false)
          }
        },
        function (error) {
          fail(error)
        }
      )
    },
  }
}