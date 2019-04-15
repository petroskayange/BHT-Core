/**
 * Immediately executing func that creates a Patient js revealing module
 * @return {object}
 */
const Patient = function () {
  /** @type {string} */
  const apiRoot =  `${sessionStorage.apiProtocol}://${sessionStorage.apiURL}:${sessionStorage.apiPort}/api/v1`

  /** @type {object} */
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': sessionStorage.authorization
  }

  /** @type {object} */
  let patient = {}

  /**
   * Function to initialize a patient
   * 
   * @param {object} data
   * 
   * @return {undefined} 
   */
  function init (data = {}) {
    patient = data
  }

  /**
   * Function to ask the EMR-API for a patient summary
   * 
   * @param {Object} params - Object with programId and patientId
   * 
   * @return {Object}
   */
  function get (params = {}) {
    return fetch(`${apiRoot}/programs/${params.programId}/patients/${params.patientId}`, {
      method: 'GET',
      headers: { 'Authorization': sessionStorage.authorization }
    })
  }

  /**
   * Function to ask the EMR-API to create a patient
   * 
   * @param {object} params
   * 
   * @return {Promise} 
   */
  function create (params = {}) {
    return fetch (`${apiRoot}/patients`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(params)
    })
  }

  return {
    get,
    create
  }
}()