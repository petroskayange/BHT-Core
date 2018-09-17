// var patientID = patient_id
var url = new URL(url);
var apiURL = sessionStorage.getItem("apiURL");
var apiPort = sessionStorage.getItem("apiPort");
var apiProtocol = sessionStorage.getItem("apiProtocol");
var id = url.searchParams.get("user_id");
var applicationName = sessionStorage.getItem("applicationName");

function checkIfEncounterCaptured(encounterType, name) {
  
    var url = '/apps/' + applicationName[0] +'/application.json';;
    // console.log(applicationName);
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
      // console.log(encounterType);
      if (this.readyState == 4 && this.status == 200) {
        var results = JSON.parse(this.responseText);
        var available = results.encounters[encounterType].available;
        var url = results.encounters[encounterType].url;
        console.log(available);
        if (available == false) {
          window.location.href = '/';
        }else {
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