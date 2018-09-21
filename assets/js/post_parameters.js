
function submitParameters(parameters, url, returnToFunction) {
  var url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1" + url;

  var parametersPassed = JSON.stringify(parameters);

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 201) {
      var obj = JSON.parse(this.responseText);
      eval(returnToFunction)(obj);
    }
  };
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send(parametersPassed);
}

