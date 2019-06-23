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
    MCH: 2232,
    OPD: 7799,
    MINING_COMMUNITIES: 9696,
    ART_CLINIC: 7054,
    POSITIVE: 703,
    PRISONER: 2007,
    WARD: 7829,
    HIV_TEST_DATE: 1837,
    PREVIOUSLY_TESTED: 9656,
    PREVIOUS_TEST_DATE: 9657,
    ON_ART: 1577,
    HIV_STATUS: 3753,
    HIV_TEST_DONE_TODAY: 9568,
    NOT_DONE: 1118,
    REASON_HIV_TEST_NOT_DONE: 9569,
    LIVES_NEAR: 9166,
    TB_SYMPTOMS: 1560,
    PRESCRIBE_DRUGS: 7874,
    MEDICAL_ORDERS: 1282,
    AMOUNT_DISPENSED: 2834,
    X_RAY: 6687,
    CLINICAL: 3592,
    TB_STATUS: 7459,
    PROCEDURE_TYPE: 9587,
    TB_ADHERENCE: 6987,
    DRUGS_BROUGHT: 2540,
    TB_DRUGS_START_DATE: 1113,
    HEALTH_WORKER: 1538,
    PREV_TEST_DATE: 9657,
    COUGH_DURATION: 5959,
    OCCUPATION: 1304,
    TRANSFERRED_OUT_EXTERN: 9230,
    TRANSFERRED_IN: 8365,
    FACILITY_NAME: 8341,
    TRANSFERRED_OUT_STATE: 95,
    REGIMEN_SUPPLY_DAYS: 3640,
    OTHER_REFERRAL: 6408,
    RESULT_DATE: 3045,
    LAB_ORDER: 3388,
    PULMONARY_TB: 1549,
    EXTRA_PULMONARY_TB: 1547,
    TB_TYPE: 2596,
    DIAGNOSIS_DATE: 2182,
    TB_NUMBER: 7930,
    APPOINTMENT_REASON: 6784,
    ULTRASOUND: 6686,
    MENINGITIS_TB: 6628,
    TUBERCULOSIS_CLASS: 7932,
    'Pleural Effusion': 1136,
    'Pericardial Effusion': 6875,
    'Abdominal Tuberculosis': 9786,
    'Tuberculosis Ascites': 581,
    'Tuberculosis Spine': 7509,
    'Infiltration': 7684,
    'Tuberculosis Miliary': 7511,
    'Opacification': 9787,
    'Consolidation': 9788,
    'Cavitation': 9789,
    'Hilar Lymphadenopathy': 9790,
    'Tuberculosis Meningitis': 6628,
    'Lymphadenitis': 3736,
    LAM: 9791,
    'All Other': 6408,
    CLINICALLY_DIAGNOSED: 9792,
    BACTERIOLOGICALLY_DIAGNOSED: 9793,
    SAMPLE: 6680,
    REASON_FOR_TEST: 2429,
    TEST_REQUESTED: 6660,
    HAVE_YOU_HAD_TB: 8266,
    TREATMENT_FAILURE: 843,
    RELAPSE: 1524,
    NEW_TB_CASE: 2406,
    PATIENT_CATEGORY: 7935,
    TREATMENT_DURATION: 3515,
    NEW_PATIENT: 2406,
    REFERRAL: 9675,
    PATIENT_TYPE: 3289,
    UNKNOWN: 1067,
    DEFAULTER: 6828
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
    getConceptIdByName
  }
}()
