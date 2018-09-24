// var patientID = patient_id

var url = new URL(window.location.href);
var apiURL = sessionStorage.getItem("apiURL");
var apiPort = sessionStorage.getItem("apiPort");
var apiProtocol = sessionStorage.getItem("apiProtocol");

var id = url.searchParams.get("user_id");


function checkIfEncounterCaptured(encounter_name) {
    var applicationName = sessionStorage.getItem("applicationName");
    
    var url = '/apps/' + applicationName +'/application.json';
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var results = JSON.parse(this.responseText);
        var available = results.encounters[encounter_name].available;
        var url = results.encounters[encounter_name].url;

        if (available == false) {
          window.location.href = '/';
        }else if (available == true){
          if(sessionStorage.userActivities.length < 1){
            window.location.href = url;
          }else{
            checkIfActivitySelected(encounter_name, url);
          }
        }


      }
    };
    try {
      req.open('GET', url, true);
      req.setRequestHeader('Authorization', sessionStorage.getItem('authorization'));
      req.send(null);
    } catch (e) {}
  
}

function nextEncounter(patient_id, program_id, session_date) {
  var url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1/workflows";

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var obj = JSON.parse(this.responseText);
      checkIfEncounterCaptured(obj["name"].toLowerCase());
    }
  };
  xhttp.open("GET", (url + "/" + program_id + "/" + patient_id), true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send();

}
            
function checkIfActivitySelected(encounter_name, url) {
  var selected_activities = sessionStorage.userActivities;

  if(parseInt(sessionStorage.programID) == 1){
    if(encounter_name == "art adherence" && !selected_activities.match(/Manage ART adherence/i)){
      window.location.href = "/views/patient_dashboard.html?patient_id=" + sessionStorage.patientID;
      return;
    }else if(encounter_name == "hiv clinic consultation" && !selected_activities.match(/Manage HIV clinic consultations/i)){
      window.location.href = "/views/patient_dashboard.html?patient_id=" + sessionStorage.patientID;
      return;
    }else if(encounter_name == "hiv reception" && !selected_activities.match(/Manage HIV reception visits/i)){
      window.location.href = "/views/patient_dashboard.html?patient_id=" + sessionStorage.patientID;
      return;
    }else if(encounter_name == "hiv staging" && !selected_activities.match(/Manage HIV staging visits/i)){
      window.location.href = "/views/patient_dashboard.html?patient_id=" + sessionStorage.patientID;
      return;
    }else if(encounter_name == "appointment" && !selected_activities.match(/Manage Appointments/i)){
      window.location.href = "/views/patient_dashboard.html?patient_id=" + sessionStorage.patientID;
      return;
    }else if(encounter_name == "dispensing" && !selected_activities.match(/Manage Drug Dispensations/i)){
      window.location.href = "/views/patient_dashboard.html?patient_id=" + sessionStorage.patientID;
      return;
    }else if(encounter_name == "treatment" && !selected_activities.match(/Manage Prescriptions/i)){
      window.location.href = "/views/patient_dashboard.html?patient_id=" + sessionStorage.patientID;
      return;
    }else if(encounter_name == "vitals" && !selected_activities.match(/Manage Vitals/i)){
      window.location.href = "/views/patient_dashboard.html?patient_id=" + sessionStorage.patientID;
      return;
    }else if(encounter_name == "hiv clinic registration" && !selected_activities.match(/Manage HIV first visits/i)){
      window.location.href = "/views/patient_dashboard.html?patient_id=" + sessionStorage.patientID;
      return;
    }
  }
  
  window.location.href = url;
}

