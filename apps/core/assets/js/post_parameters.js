function submitEncounter(encounter, returnToFunction) {
  var url = apiProtocol+'://'+apiURL+':'+apiPort+'/api/v1/encounters';

  var parametersPassed = JSON.stringify(encounter);

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 201) {
      var obj = JSON.parse(this.responseText);
      eval(returnToFunction)(obj['encounter_id']);
    }
  };
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send(parametersPassed);
}


function createObs(observations, returnToFunction){
  var url = apiProtocol+'://'+apiURL+':'+apiPort+'/api/v1/observations';

  var parametersPassed = JSON.stringify(observations);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 201) {
      var objs = JSON.parse(this.responseText);
      eval(returnToFunction)(objs);
    }
  };
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send(parametersPassed);

}
