var apiProtocol = sessionStorage.apiProtocol;
var apiURL = sessionStorage.apiURL;
var apiPort = sessionStorage.apiPort;
var patient_id = sessionStorage.patientID;

function getDemographics(patient_id) {
    var url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1/patients/" + patient_id;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
            var obj = JSON.parse(this.responseText);
            obj = obj["person"];
            var names = obj["names"][0];
            sessionStorage.family_name = names["family_name"];
            sessionStorage.given_name = names["given_name"];
            sessionStorage.patientGender = obj["gender"];
            var roundedAge = Math.round(moment().diff(obj["birthdate"], 'years', true));
            sessionStorage.patientAge = roundedAge;
            sessionStorage.patientGender = obj["gender"];
            sessionStorage.patientDOB = moment(obj["birthdate"]).format("DD/MMM/YYYY");
            //sessionStorage.sessionDate = moment().format("YYYY-MM-DD");
            sessionStorage.currentWeight = 0;
            sessionStorage.previousWeight = 0;
            sessionStorage.currentHeight = 0;
        }
    };
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
    xhttp.setRequestHeader('Content-type', "application/json");
    xhttp.send();
}
