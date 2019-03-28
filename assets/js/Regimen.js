const Regimen = function () {
  const apiRoot =  `${sessionStorage.apiProtocol}://${sessionStorage.apiURL}:${sessionStorage.apiPort}/api/v1`
  let regimen = null

  function init (data) {
    regimen = data
  }

  function getApplicableProgramRegimens (options = {}) {
    fetch (`${apiRoot}/programs/${options.data.programId}/regimens/?patient_id=${options.data.patientId}`, {
      method: 'GET',
      headers: {
        'Authorization': sessionStorage.authorization
      }
    })
      .then((response) => {
        if (response.status === 200) {
          options.success(response)
        } else {
          options.fail(response)
        }
      })
      .catch((error) => {
        options.fail(error)
      })
  }

  return {
    getApplicableProgramRegimens
  }
}()