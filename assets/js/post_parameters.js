
function submitParameters(parameters, url, returnToFunction) {
  try {
    buildWall();
    showStatus();
  } catch (e) {

  }
  
  var url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1" + url;
  
  parameters.program_id = sessionStorage.programID;
  var parametersPassed = JSON.stringify(parameters);
  
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 ) {
      if ( (this.status == 201 || this.status == 200)) {
        var obj = JSON.parse(this.responseText);
          eval(returnToFunction)(obj);
          try {    
                  document.getElementById("innerPop").style.display = "none";
          }catch(e) {
        
          }
      }else if (this.status == 404 || this.status == 400 || this.status == 500) {
        alertify.alert('An error has occured', 'Error' + this.status , function(){ alertify.success('Ok'); });
  
      }
      }else {
       
        alertify.alert('An error has occured', 'Error' + this.status , function(){
           var submitCover = document.getElementById('submit-cover');
           document.getElementsByClassName("ajs-button ajs-ok")[0].style.background = "";
           document.getElementById("innerPop").style.display = "none";
           document.getElementById("popupBox").style.display = "none";
           if (submitCover){
               submitCover.parentNode.removeChild(submitCover);
           }
          });
      }
      console.log(this.status);
  };
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send(parametersPassed);
}

function buildWall() {
  var submitCover = document.getElementById('submit-cover');
  if (submitCover){
      submitCover.parentNode.removeChild(submitCover);
  }

  var divCover = document.createElement('div');
  divCover.setAttribute('id','submit-cover');
  var wBody = document.getElementsByTagName('body')[0];
  
  var span = document.createElement('span');
  span.innerHTML = "<style>\
    #submit-cover {\
    position: absolute;\
    background-color: black;\
    width: 100%;\
    height: 102%;\
    left: 0%;\
    top: 0%;\
    z-index: 990;\
    opacity: 0.65;\
  }\
  </style>";
  
  try {
    wBody.appendChild(span);
    wBody.appendChild(divCover);
  }catch(i) {}
}
