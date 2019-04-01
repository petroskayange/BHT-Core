const Regimen = function () {
  const apiRoot =  `${sessionStorage.apiProtocol}://${sessionStorage.apiURL}:${sessionStorage.apiPort}/api/v1`
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': sessionStorage.authorization
  }

  let regimen = null

  function init (data) {
    regimen = data
  }

  function getApplicableProgramRegimens (params = {}) {
    return fetch (
      `${apiRoot}/programs/${params.programId}/regimens/?patient_id=${params.patientId}`,
      {
        method: 'GET',
        headers: { 'Authorization': sessionStorage.authorization }
      })
  }

  return {
    getApplicableProgramRegimens
  }
}()