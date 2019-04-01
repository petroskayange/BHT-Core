const Encounter = function () {
  const apiRoot =  `${sessionStorage.apiProtocol}://${sessionStorage.apiURL}:${sessionStorage.apiPort}/api/v1`
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': sessionStorage.authorization
  }

  let encounter = null

  function init (data) {
    encounter = data
  }

  function create (params = {}) {
    return fetch (`${apiRoot}/encounters`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(params)
    })
  }

  return {
    create
  }
}()