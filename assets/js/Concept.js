/**
 * Immediately executing function that creates a revealing Concept module
 * 
 * @return {object}
 */
const Concept = function () {
  /** @type {string} */
  const apiRoot =  `${sessionStorage.apiProtocol}://${sessionStorage.apiURL}:${sessionStorage.apiPort}/api/v1`

  /** @type {object} */
  let concept = {}

  /**
   * Function that initializes a concept
   * 
   * @param {object} data
   * 
   * @return {undefined}
   */
  function init (data = {}) {
    concept = data
  }

  /**
   * Function to lookup concept names in the CONCEPT_IDS object
   * 
   * @param {string} conceptName
   * 
   * @return {number|null}
   */
  function getConceptIdByName (conceptName = '') {
    return CONCEPT_IDS[conceptName] || null
  } 

  /** 
   * Central object containing concept ids
   * 
   * @type {object}
   */
  const CONCEPT_IDS = {
    'Cough lasting >1 week': 9694,
    'Cough lasting >2 weeks': 2573,
    'Cough (any duration)': 8261,
    'Weight loss': 832,
    'Fever lasting >1 week': 8279,
    'Fever lasting >2 weeks': 9689,
    'Fever (any duration)': 9690,
    'Profuse night sweats lasting >1 week': 9691,
    'Profuse night sweats lasting >2 weeks': 9692,
    'Profuse night sweats (any duration)': 9693,
    PATIENT_IS_PREGNANT: 1755,
    YES_ANSWER: 1065,
    NO_ANSWER: 1066,
    TB_SCREENING_CRITERIA: 9698,
    'OPD / MCH Clinic / HIV Negative': 9695,
    'Mining Communities': 9696,
    'HIV Clinic / PLHIV / Prisoners': 9697,
    HTS_CLINIC: 7796,
    PRIVATE_PRACTITIONER: 8349,
    SPUTUM_COLLECTION_POINT: 8350,
    PMTCT: 1939,
    WALK_IN: 1791,
    SOURCE_OF_REFERRAL: 8021,
    NEGATIVE: 664,
    MCH: 1018,
    OPD: 7799,
    MINING_COMMUNITIES: 9696,
    ART_CLINIC: 7054,
    POSITIVE: 703,
    PRISONER: 9734,
    WARD: 7829,
    HIV_TEST_DATE: 1837,
    PREVIOSULY_TESTED: 9656,
    PREVIOUS_TEST_DATE: 9657,
    ON_ART: 7010,
    NOT_ON_ART: 8037,
    HIV_STATUS: 3753,
    HIV_TEST_DONE_TODAY: 9568,
    NOT_DONE: 2475,
    REASON_HIV_TEST_NOT_DONE: 9569,
    LIVES_NEAR: 9166,
    TB_SYMPTOMS: 1560,
    PRESCRIBE_DRUGS: 7874,
    MEDICAL_ORDERS: 1282,
    'RHZ (R75/H50/Z150)': 765,
    'E (Ethambutol 100mg tablet)': 745,
    'RH (R75/H50)': 1194,
    'RH (R150/H75)': 1194,
    'RHZE (R150/H75/Z400/E275)': 1131,
    AMOUNT_DISPENSED: 2834
  }

  /**
   * Function that asks the EMR-API to create a concept
   * 
   * @param {object} data
   * 
   * @return {Promise}
   */
  function create (data = {}) {
    return fetch (`${apiRoot}/concepts`, {
      method: 'POST',
      headers: {
        'Authorization': sessionStorage.authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data.params)
    })
  }

  return {
    create,
    getConceptIdByName,
    CONCEPT_IDS
  }
}()