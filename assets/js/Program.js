/**
 * Immediately executing function that creates a revealing Program js module
 * 
 * @return {Object}
 */
const Program = function () {
  /** @type {String} */
  const apiRoot =  `${sessionStorage.apiProtocol}://${sessionStorage.apiURL}:${sessionStorage.apiPort}/api/v1`

  /** @type {Object} */
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': sessionStorage.authorization
  }

  /** @type {Object} */
  let program = {}

  /**
   * Function that initializes a program
   * 
   * @param {Object} data
   * 
   * @return {undefined}
   */
  function init (data = {}) {
    program = data
  }

  /**
   * Function that asks the EMR-API to enroll a patient into a program
   * 
   * @param {Object} params
   * 
   * @return {Promise}
   */
  function enroll (params = {}) {
    return fetch (`${apiRoot}/patients/${params.patientId}/programs`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ program_id: params.programId, date_enrolled: params.dateEnrolled })
    })
  }

  return {
    enroll
  }
}()