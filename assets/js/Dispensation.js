const Dispensation = function () {
  const apiRoot =  `${sessionStorage.apiProtocol}://${sessionStorage.apiURL}:${sessionStorage.apiPort}/api/v1`
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': sessionStorage.authorization
  }

  let dispensation = null

  function init (data) {
    dispensation = data
  }

  function create (params = {}) {
    return fetch (`${apiRoot}/dispensations`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(params)
    })
  }

  return {
    create
  }
}()