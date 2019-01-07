function getProgramWorkflowStates (options = {}) {
  const apiPath = `${apiProtocol}://${apiURL}:${apiPort}/api/v1/programs/${options.programId}/workflows`
  GET (
    {
      url: apiPath,
      async: true,
      headers: {
        'Authorization': options.authToken
      }
    },
    {},
    (data) => {
      options.success(data)
    },
    (error) => {
      options.error(error)
    }
  )
}

function getStateIdByName (options = {}) {
  getProgramWorkflowStates (
    {
      programId: sessionStorage.getItem('programID'),
      authToken: sessionStorage.getItem('authorization'),
      success: (data) => {
        const stateId = data[0].states.filter((state) => {
          return state.concept.concept_names.every((concept_name) => {
            return concept_name.name === options.stateName
          })
        })[0].program_workflow_state_id
        if (!stateId) {
          options.error(new Error(`getStateIdByName: The passed state with name (${options.stateName}), does not exist.`))
        } else {
          options.success(stateId)
        }
      },
      error: (error) => {
        options.error(error)
      }
    }
  )
}

function createPatientState (options = {}) {
  const apiPath = `${apiProtocol}://${apiURL}:${apiPort}/api/v1/programs/${options.programId}/patients/${options.patientId}/states`
  getStateIdByName(
    {
      stateName: options.stateName,
      success: (stateId) => {
        POST (
          {
            url: apiPath,
            async: true,
            headers: {
              'Authorization': options.authToken,
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          },
          { state: stateId },
          (data) => {
            options.success(data)
          },
          (error) => {
            options.error(error)
          }
        )
      },
      error: (error) => {
        options.error(error)
      }
    }
  )
}