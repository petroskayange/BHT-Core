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
          window.location.href = url;
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
