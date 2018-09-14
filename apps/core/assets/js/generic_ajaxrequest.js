var patientID = patient_id

function checkIfEncounterCaptured(encounterType, name){
    jQuery.ajax({
      type: "POST",
      url: "/patients/encounters",
      data: "",
      success: function(result){
      	if(result == 'true'){
      		jQuery("#next-task").html(result);	
      	}
        
      }
    });
  }



