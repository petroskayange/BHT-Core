/**
 * Immediately executing function that creates a revealing DrugOrder module
 * 
 * @return {object}
 */
const DrugOrder = function () {
  /** @type {string} */
  const apiRoot =  `${sessionStorage.apiProtocol}://${sessionStorage.apiURL}:${sessionStorage.apiPort}/api/v1`

  /** @type {object} */
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': sessionStorage.authorization
  }

  /** @type {object} */
  let order = {}

  /**
   * Function to initialize a DrugOrder
   * 
   * @param {object} data
   * 
   * @return {undefined}
   */
  function init (data = {}) {
    order = data
  }

  /**
   * Function that asks the EME-API to create a drug order
   * 
   * @param {object} params
   * 
   * @return {Promise} 
   */
  function create (params = {}) {
    return fetch (`${apiRoot}/drug_orders`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(params)
    })
  }

  /**
   * Function to ask the EMR-API for a patient's recent drug orders
   * 
   * @param {number} patientId
   * 
   * @return {Promise}
   */
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