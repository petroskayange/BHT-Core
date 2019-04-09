const State = function () {
  const state = null
  const apiRoot = `${sessionStorage.apiProtocol}://${sessionStorage.apiURL}:${sessionStorage.apiPort}/api/v1`

  function init (data = {}) {
    state = data
  }

  function _void (options = {}) {
    fetch(
      `${apiRoot}/programs/${options.programId}/patients/${options.patientId}/states/${options.stateId}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': sessionStorage.authorization
        }
      }
    )
      .then(options.success)
      .catch(options.fail)
  }

  return {
    _void
  }
}()