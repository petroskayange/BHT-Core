var previousNextButton = null;
var yesNo_Hash = {};

function isEmpty(obj) {
	for(var key in obj) {
		if(obj.hasOwnProperty(key))
			return false;
		}
	return true;
}

function validateYesNo(concept_name, values) {
  if(isEmpty(yesNo_Hash)){
    showMessage('Please complete selection by clicking Yes / No');
    return;
  }

	var values = values.split('#');
	for(c in yesNo_Hash){
		for(name in yesNo_Hash[c]){
		
			for(var j = 0 ; j < values.length; j++){
				var concept = values[j].split(',')[0].trim();
				if(!yesNo_Hash[concept_name][concept]){
					showMessage('Please complete all selection(s) by clicking either Yes / No');
					return;
				}
			}

		}
	}

  var nextButton =  document.getElementById('nextButton');
  nextButton.setAttribute('onmousedown', previousNextButton);
	//gotoNextPage();

	eval(nextButton.getAttribute("onmousedown"));
}

function buildYesNoUI(concept_name, values) {
  var nextButton =  document.getElementById('nextButton');
	previousNextButton = nextButton.getAttribute("onmousedown");
  nextButton.setAttribute('onmousedown',"validateYesNo('" + concept_name + "','" + values + "');");
  nextButton.setAttribute('onclick',"");


  var inputFrame = document.getElementById("inputFrame" + tstCurrentPage); //.getElementsByClassName('yes_nos');
  inputFrame.style = "width: 96%;";
  createNewCtrl(inputFrame, concept_name, values);
}

function createNewCtrl(e, concept_name, values) {
  var attributes = values.split("#");
 
	for(var i = 0 ; i < attributes.length; i++){
		yesNo_Hash[concept_name] = {};
		yesNo_Hash[concept_name][attributes[i].split(',')[0].trim()] = null;
	}
 
  var yesNoTable = document.createElement("table");
  yesNoTable.setAttribute("class","yes_no_table");

  for(var i  = 0 ; i < attributes.length ; i++){
    var concept = attributes[i].split(",")[0];
    var concept_id = attributes[i].split(",")[1];

    var setFunctionName = '';
    try{
      setFunctionName = attributes[i].split(",")[2];
    }catch(a){
      setFunctionName = '';
    }
    
    var r = document.createElement("tr");
    td = document.createElement("td");
    td.innerHTML = concept
    r.appendChild(td);

    yes_no = ["Yes","No"];
    for(var x = 0; x < ["Yes","No"].length; x++){
      td = document.createElement('td');
      td.setAttribute("class", "yes_no_container");
      button = document.createElement("a");
      button.setAttribute("id", "btn_" + yes_no[x].toLowerCase() + "_" + i);

      if(setFunctionName != undefined){
        setFunctions = "buttonClicked(this,'" + concept_name + "','" + concept + "');"  + setFunctionName + "(this);";
        button.setAttribute("onclick", setFunctions);
      }else{
        button.setAttribute("onclick","buttonClicked(this,'" + concept_name + "','" + concept + "');");
      }

      button.setAttribute("value", concept_id);
      button.setAttribute("class", "yes_no_btns not-clicked");
      button.innerHTML = "<span class='yes_no_text'>" + yes_no[x] + "</span>";
      td.appendChild(button);
      r.appendChild(td);
    }

    yesNoTable.appendChild(r);
  }

  e.appendChild(yesNoTable)
}

function buttonClicked(btn, concept_name, concept) {
  var idIdenx = btn.getAttribute("id").split("_")[2];

  document.getElementById("btn_yes_" + idIdenx).setAttribute("class","yes_no_btns not-clicked");
  document.getElementById("btn_no_" + idIdenx).setAttribute("class","yes_no_btns not-clicked");
    
  if(btn.getAttribute("class").match(/not-clicked/i)){
    btn.setAttribute("class","yes_no_btns clicked");
  }else{
    btn.setAttribute("class","yes_no_btns not-clicked");
  }
	
	var value = btn.id;
	value = (value.match(/no/i) ? "No" : "Yes");
	yesNo_Hash[concept_name][concept] = value;
}

