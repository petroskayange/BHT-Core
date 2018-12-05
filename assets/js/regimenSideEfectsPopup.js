var popBoxCSS = document.createElement("span");
popBoxCSS.innerHTML = "<style>\
.side-effect-table {\
  text-align: center;\
  font-size: 20px;\
  height: 30px;\
  border-style: solid;\
  border-width: 0px 0px 1px 0px;\
  border-color: blue;\
}\
#confirmatory-test-popup-div {\
  width: 96% !important;\
  left: 1.4% !important;\
  top: -65px !important;\
  height: 85% !important;\
}\
#side-effects-table {\
  width: 97%;\
  margin: 10px;\
}\
#side-effects-table th {\
  background-color: lightgray;\
  font-size: 1.3em;\
}\
.buttonContainer {\
  width: 97%;\
  display: table;\
  position: absolute;\
  bottom: 0px;\
  padding: 10px;\
  border-collapse: separate;\
  border-spacing: 5px 10px;\
}\
.buttonContainerRow {\
  display: table-row;\
}\
.buttonContainerCell {\
  display: table-cell;\
  border-width: 1px;\
  border-style: solid;\
  text-align: center;\
  vertical-align: middle;\
  box-shadow: 0 8px 6px -6px black;\
  height: 100px;\
  font-weight: bold;\
  font-size: 20px;\
  color: white;\
}\
#buttonContainerCell-green {\
  background-color: rgb(34, 139, 34);\
}\
#buttonContainerCell-blue {\
  background-color: rgb(79, 148, 205);\
}\
#buttonContainerCell-lightblue {\
  background-color: rgb(0, 178, 238);\
}\
#tbody td {\
  text-align: center;\
  font-size: 1.3em;\
}\
</style>";




function checkForSideEffects() {
  var popBox = document.getElementById("confirmatory-test-popup-div");
  var popBoxCover = document.getElementById("confirmatory-test-cover");

  popBoxCover.style = "display: inline;";
  popBox.style = "display: inline;";

  popBox.innerHTML = null;

  var sideEffectContainer = document.createElement("div");
  sideEffectContainer.setAttribute("class","side-effect-table");
  popBox.appendChild(sideEffectContainer);

  var sideEffectContainerRow = document.createElement("div");
  sideEffectContainerRow.setAttribute("class","side-effect-table-row");
  sideEffectContainer.appendChild(sideEffectContainerRow);

  var sideEffectContainerCell = document.createElement("div");
  sideEffectContainerCell.setAttribute("class","side-effect-table-cell");
  sideEffectContainerCell.innerHTML = "Contraindications / Side effects for selected regimen"
  sideEffectContainerRow.appendChild(sideEffectContainerCell);


  var table = document.createElement('table');
  table.setAttribute('id','side-effects-table'); 
  popBox.appendChild(table);

  var tr = document.createElement('tr');
  table.appendChild(tr);

  var headers = ['&nbsp;','Contraindication(s)','Side effect(s)'];
  for(var i = 0 ; i < headers.length ; i++){
    var th = document.createElement('th');
    th.innerHTML  = headers[i];
    tr.appendChild(th);
  }

  var tbody = document.createElement('tbody');
  tbody.setAttribute('id','tbody');
  table.appendChild(tbody);


  var buttonContainer = document.createElement('div');
  buttonContainer.setAttribute('class','buttonContainer');
  popBox.appendChild(buttonContainer);

  var buttonContainerRow = document.createElement('div');
  buttonContainerRow.setAttribute('class','buttonContainerRow');
  buttonContainer.appendChild(buttonContainerRow);

  var cells = ['Select other regimen','View whole history','Keep selected regimen'];
  
  for(var i = 0 ; i < cells.length ; i++){
    var buttonContainerCell = document.createElement('div');
    buttonContainerCell.setAttribute('class','buttonContainerCell');
    buttonContainerCell.innerHTML = cells[i];

    if(i == 0) {
      buttonContainerCell.setAttribute('id','buttonContainerCell-lightblue');
      buttonContainerCell.setAttribute('onmousedown','closePopUp();');
    }else if(i == 1) {
      buttonContainerCell.setAttribute('id','buttonContainerCell-blue');
    }else if(i == 2) {
      buttonContainerCell.setAttribute('id','buttonContainerCell-green');
      buttonContainerCell.setAttribute('onmousedown','closePopUp();checkIFStartPackApplies();');
    }

    buttonContainerRow.appendChild(buttonContainerCell);
  }


  var hmtlBody = document.getElementsByTagName("body")[0];
  hmtlBody.appendChild(popBoxCSS);

}

function fetchSideEffectsIfANY(concept) {
  var concept_id = concept[0][1];

  var url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1";
  url += "/observations?concept_id=" + concept_id; 
  url += "&person_id=" + sessionStorage.patientID;
  url += "&start_date=1900-01-01&end_date="; 
  url += moment(sessionDate).format('YYYY-MM-DD');

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
      var obj = JSON.parse(this.responseText);

      for(var i = 0 ; i < obj.length ; i++) {
        var value_coded = 0;
        try {
          value_coded = parseInt(obj[i].value_coded);
        }catch(e){
          value_coded = 0;
        }
             
        if(value_coded == 1065){      
          var dateTime = moment(new Date(obj[i]['obs_datetime'])).format('DD/MMM/YYYY')
          if(sideEffectHash[dateTime] == null)
            sideEffectHash[dateTime] = [];

          sideEffectHash[dateTime].push(concept[0][0]);
        }
      }

      sideEffects.shift();
      if(sideEffects.length > 0) {
        fetchSideEffectsIfANY(sideEffects);
      }else{
        //updateAlertTable();
        document.getElementById('confirmatory-test-cover').style = "display: none;";
      }

    }
  };
  xhttp.open("GET", url, true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send();
}


function updateAlertTable() {
  if(isHashEmpty(sideEffectHash)){
    return;
  }else{

    checkForSideEffects();
    var tbody = document.getElementById('tbody');

    for(var vdate in sideEffectHash) {
      var tr = document.createElement('tr');
      tbody.appendChild(tr);

      var td = document.createElement('td');
      td.innerHTML = vdate;
      tr.appendChild(td);

      var td = document.createElement('td');
      td.innerHTML = "&nbsp;"
      tr.appendChild(td);

      var td = document.createElement('td');
      td.innerHTML = sideEffectHash[vdate].join('<br />');
      tr.appendChild(td);

    }


  }  
}

function checkForPossibleSideEffects(regimen) {
  regimen = regimen.innerHTML.split(' ')[0]
  var r = /\d+/;
  regimen = parseInt(regimen.match(r));

  var sideE = contraindications[regimen];
  var matchFound = false;

  for(var i = 0 ; i < sideE.length ; i++){
    for(vdate in sideEffectHash){
      var all = sideEffectHash[vdate]
      for(var x = 0 ; x < all.length ; x++){
        if(all[x].toUpperCase() == sideE[i].toUpperCase()){
          matchFound = true;
        }
      }
    }
  }

  if(matchFound) {
    updateAlertTable();
  }
}

function isHashEmpty(obj) {                                                     
  for(var key in obj) {                                                         
    if(obj.hasOwnProperty(key))                                                 
      return false;                                                             
    }                                                                           
  return true;                                                                  
} 

function closePopUp() {
  document.getElementById('confirmatory-test-cover').style = 'display: none;';
  document.getElementById('confirmatory-test-popup-div').style = 'display: none;';
}

function checkIFStartPackApplies() {
  

  var medication = givenRegimens[selectedRegimens];
  for(var i = 0 ; i < medication.length ; i++){
    if(medication[i].drug_name.match(/nvp/i) || medication[i].drug_name.match(/nevirapine/)) {
      showStartPackMessage(medication);
    }
  }
}


function getPatientInitiationStatus() {
  var url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1";
  url += '/programs/1/patients/' + sessionStorage.patientID + '/status?date=';
  url += moment(sessionDate).format('YYYY-MM-DD');

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
      var obj = JSON.parse(this.responseText);
      patientInitiationStatus = obj.status;
    }
  };
  xhttp.open("GET", url, true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send();
}

var patientInitiationStatus;
getPatientInitiationStatus();


function showStartPackMessage(medication) {
  var popBox = document.getElementById("confirmatory-test-popup-div");
  var popBoxCover = document.getElementById("confirmatory-test-cover");

  popBoxCover.style = "display: inline;";
  popBox.style = "display: inline;";

  popBox.innerHTML = null;

  var initiationBox = document.createElement('div');
  initiationBox.setAttribute('class','initiationBox');
  popBox.appendChild(initiationBox);

  var initiationBoxRow = document.createElement('div');
  initiationBoxRow.setAttribute('class','initiationBoxRow');
  initiationBox.appendChild(initiationBoxRow);

  var initiationBoxCell = document.createElement('div');
  initiationBoxCell.setAttribute('class','initiationBoxCell');
  var cssText ='text-align: center; color: rgb(255, 165, 0);';
  cssText += 'font-size: 14pt;font-weight: bolder;';
  cssText += 'border-width: 0px 0px 1px 0px;border-style: solid;';
  initiationBoxCell.setAttribute('style', cssText);
  initiationBoxCell.innerHTML = 'Starter pack needed for 14 days';
  initiationBoxRow.appendChild(initiationBoxCell);

  var initiationBoxRow = document.createElement('div');
  initiationBoxRow.setAttribute('class','initiationBoxRow');
  initiationBox.appendChild(initiationBoxRow);

  var initiationBoxCell = document.createElement('div');
  if(patientInitiationStatus == 'Initiation'){
    var text = '<b style="color: green;">First time initiation</b> ';
  }else{
    var text = '<b style="color: green;">Re-initiation</b> ';
  }

  initiationBoxCell.setAttribute('class','initiationBoxCell');
  initiationBoxCell.innerHTML = text + '<br />';

  for(var i = 0 ; i < medication.length ; i++){
    initiationBoxCell.innerHTML += medication[i].drug_name + '<br />';
  }
  var cssText = 'text-align: center; margin-top: 5%;';
  cssText += 'font-size: 25px;';
  initiationBoxCell.setAttribute('style', cssText);
  initiationBoxRow.appendChild(initiationBoxCell);



  var buttonContainer = document.createElement('div');
  buttonContainer.setAttribute('class','buttonContainer');
  popBox.appendChild(buttonContainer);

  var buttonContainerRow = document.createElement('div');
  buttonContainerRow.setAttribute('class','buttonContainerRow');
  buttonContainer.appendChild(buttonContainerRow);

  var cells = ['Cancel','Prescribe starter pack'];
  
  for(var i = 0 ; i < cells.length ; i++){
    var buttonContainerCell = document.createElement('div');
    buttonContainerCell.setAttribute('class','buttonContainerCell');
    buttonContainerCell.setAttribute('style','width: 100px;');
    buttonContainerCell.innerHTML = cells[i];
    buttonContainerCell.setAttribute('id','buttonContainerCell-blue');

    if(i == 0) {
      buttonContainerCell.setAttribute('onmousedown','closePopUp();');
    }else{
      buttonContainerCell.setAttribute('onmousedown','closePopUp();gotoNextPage();');
    }

    buttonContainerRow.appendChild(buttonContainerCell);
  }

}


var contraindications = {};
contraindications[0] = ['Jaundice','hepatitis','hypersensitivity'];
contraindications[2] = ['Jaundice','Anaemia','hepatitis'];
contraindications[4] = ['Anaemia','Psychosis'];
contraindications[5] = ['Renal Failure','Kidney Failure','Psychosis'];
contraindications[6] = ['Jaundice','Renal Failure','Kidney Failure','Hepatitis'];
contraindications[7] = ['Jaundice','Renal Failure','Kidney Failure','Hepatitis'];
contraindications[8] = ['Anaemia','Jaundice', 'Hepatitis'];
contraindications[9] = ['hypersensitivity'];
contraindications[10] = ['Renal Failure', 'Kidney Failure'];
contraindications[11] = ['Anaemia'];
contraindications[12] = [];
contraindications[13] = [];
contraindications[14] = [];
contraindications[15] = [];





var sideEffects = [                                                         
  ["Peripheral neuropathy", 821],                                               
  ["Jaundice", 215],["Lipodystrophy", 2148],["Kidney Failure",  9242], 
  ["Psychosis", 219],["Gynaecomastia", 9440],["Anemia", 3]
];

var sideEffectHash = {}
fetchSideEffectsIfANY(sideEffects);
