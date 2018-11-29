
function submitParameters(parameters, url, returnToFunction) {
  try {
    showStatus();
  } catch (e) {

  }
  
  var url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1" + url;

  var parametersPassed = JSON.stringify(parameters);

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
      var obj = JSON.parse(this.responseText);
      eval(returnToFunction)(obj);
	 try {    
      		document.getElementById("innerPop").style.display = "none";
	 }catch(e) {

	 }
    }
  };
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send(parametersPassed);
}

