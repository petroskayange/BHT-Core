const GlobalProperty = function (options = {}) {
  return {
    isEnabled: (property, success, fail) => {
      const url = `${options.path}/global_properties?property=${property}`
      GET(
        {
          url: url,
          async: true,
          headers: {
            Authorization: options.authToken
          }
        },
        {},
        (data) => {
          if (data[property] === 'true') {
            success(true)
          } else {
            success(false)
          }
        },
        (error) => {
          fail(error)
        }
      )
    },
  }
}