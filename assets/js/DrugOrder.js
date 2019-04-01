const DrugOrder = function () {
  const apiRoot =  `${sessionStorage.apiProtocol}://${sessionStorage.apiURL}:${sessionStorage.apiPort}/api/v1`
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': sessionStorage.authorization
  }

  let order = null

  function init (data) {
    order = data
  }

  function create (params = {}) {
    return fetch (`${apiRoot}/drug_orders`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(params)
    })
  }

  function getRecentPatientDrugOrder (patientId) {
    return fetch(`${apiRoot}/drug_orders?patient_id=${patientId}`, {
      method: 'GET',
      headers: { 'Authorization': sessionStorage.authorization }
    })
  }

  return {
    create,
    getRecentPatientDrugOrder
  }
}()