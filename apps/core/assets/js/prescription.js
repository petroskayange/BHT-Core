
function buildPrescriptionPage() {
  var iframe = document.getElementById("inputFrame" + tstCurrentPage);
  iframe.style = "width: 96%;";

  var main_table = document.createElement("div");
  main_table.setAttribute("class","main-table");
  iframe.appendChild(main_table);

  var main_table_row = document.createElement("div");
  main_table_row.setAttribute("class","main-table-row");
  main_table.appendChild(main_table_row);

  var cells = ["left", "right"];

  for(var i = 0 ; i < cells.length ; i++){
    var main_table_cell = document.createElement("div");
    main_table_cell.setAttribute("class","main-table-cell");
    main_table_cell.setAttribute("id","main-table-cell-" + cells[i]);
    main_table_row.appendChild(main_table_cell);
  }


  buildNavButtons();
  buildMedicationSearch();
}

function buildMedicationSearch() {
  var mainContainer = document.getElementById("main-table-cell-right");
  var results_divs = document.createElement("div");
  results_divs.setAttribute("class","results-divs-table");
  mainContainer.appendChild(results_divs);

  var results_divs_row = document.createElement("div");
  results_divs_row.setAttribute("class","results-divs-table-row");
  results_divs.appendChild(results_divs_row);
   
  var cells = ["left", "right"];

  for(var i = 0 ; i < cells.length ; i++){
    var main_table_cell = document.createElement("div");
    main_table_cell.setAttribute("class","results-divs-table-cell");
    main_table_cell.setAttribute("id","results-divs-table-cell-" + cells[i]);
    results_divs_row.appendChild(main_table_cell);
  }
/*
  test = document.getElementById("results-divs-table-cell-left");
  i = 0;
  while (i < 200) {
    test.innerHTML += "<br /> " + i
    i++
  }
*/

  var results_divs_row = document.createElement("div");
  results_divs_row.setAttribute("class","results-divs-table-row");
  results_divs.appendChild(results_divs_row);

  var main_table_cell = document.createElement("div");
  main_table_cell.setAttribute("id","keyboard-divs-table-cell");
  results_divs_row.appendChild(main_table_cell);

  addKeyboard()
  displaySelected("results-divs-table-cell-right");
}

function addSelectionTable() {

}

function addKeyboard() {
  var e = document.getElementById("keyboard-divs-table-cell");

  var qwerty = [];
  qwerty.push(["q","w","e","r","t","y","u","i","o","p"]);
  qwerty.push(["a","s","d","f","g","h","j","k","l"]);
  qwerty.push(["Shift","z","x","c","v","b","n","m","Del.","Clear"]);



  for(var i = 0 ; i < qwerty.length; i++){
    var row = document.createElement("div");
    row.setAttribute("class","search-results-keyboard-row");

    for(var j = 0 ; j < qwerty[i].length; j++){
      var cell = document.createElement("div");
      cell.setAttribute("class","search-results-keyboard-cell");
      var span = document.createElement("span");
      span.setAttribute("class","keyboard-buttons");
      span.innerHTML = qwerty[i][j];
      span.setAttribute("onmousedown","setEnteredKey(this);");
      cell.appendChild(span);
      row.appendChild(cell);
    }
    e.appendChild(row);
  }

  var keyInput = document.createElement("input");
  keyInput.setAttribute("id","key-input");
  keyInput.setAttribute("type","hidden");
  
  e.appendChild(keyInput);
}

function setEnteredKey(key) {
  var inputBox = document.getElementById("key-input");

  try{

    if(key.innerHTML.match(/Del/i)){
      inputBox.value = inputBox.value.substring(0, inputBox.value.length - 1);
    }else if(key.innerHTML.match(/Clear/i)){
      inputBox.value = null;
    }else{
      inputBox.value += key.innerHTML;
    }

  }catch(x) { }

  getMedication(inputBox.value);
}

function renderResults(medication) {
  var resultsContainer = document.getElementById("results-divs-table-cell-left");
  resultsContainer.innerHTML = null;

  var ul = document.createElement("ul");
  ul.setAttribute("id", "results-ul");

  for(var i = 0 ; i < medication.length ; i++) {
    var li = document.createElement("li");
    li.innerHTML = medication[i].name;
    li.setAttribute("tstvalue", medication[i].name);
    li.setAttribute("class", "results-list");
    li.setAttribute("dose_strength", medication[i].dose_strength);
    li.setAttribute("units", medication[i].units);
    li.setAttribute("id", medication[i].drug_id);
    li.setAttribute("onmousedown", "null; updateSelection(this);");
    ul.appendChild(li);
  }

  resultsContainer.appendChild(ul);
}

var selected_meds = {};

function updateSelection(li) {
  var lists = document.getElementsByClassName("results-list");
  for(var i = 0 ; i < lists.length ; i++){
    lists[i].style = "background-color: none;";
  }

  li.style = "background-color: lightblue;";

  selected_meds[li.id] = {
    name: li.innerHTML, am: null, 
    noon: null, pm: null,
    dose_strength: li.getAttribute("dose_strength"),
    units: li.getAttribute("units")
  };
  displaySelected("results-divs-table-cell-right");  
}

function displaySelected(container_name) {
  var mainContainer = document.getElementById(container_name);
  mainContainer.innerHTML = null;
  var table = document.createElement("table");

  for(var drug_id in selected_meds){
    var row = document.createElement("tr");
    row.setAttribute("id","row-" + drug_id);
    row.setAttribute("class","selected-meds-row");
    row.setAttribute("onmousedown","setDosage(this, '" + container_name + "');");
    table.appendChild(row);

    var td = document.createElement("td");
    td.innerHTML = "&nbsp;"
    
    var img = document.createElement("img");
    img.setAttribute("src","../../assets/images/delete.png");
    img.setAttribute("id", drug_id);
    img.setAttribute("onmousedown", "deleteFromList(this,'" + container_name + "');");
    img.setAttribute("class","icons");
    td.appendChild(img);
    row.appendChild(td);

    var td = document.createElement("td");
    td.innerHTML = selected_meds[drug_id].name;
    row.appendChild(td);


  }

  mainContainer.appendChild(table);
}

function setDosage(e, container_name) {
  if(container_name != "dosage-table-cell-left")
    return;

  var rows = document.getElementsByClassName("selected-meds-row");
  for(var i = 0 ; i < rows.length ; i++){
    rows[i].style = "background-color: none; color: black;";
  }
  e.style = "color: black; background-color: #87ceeb;";
  resetDosageContainers();
  
  var drug_id = e.id.replace("row-","");
  document.getElementById("text-am").value    = selected_meds[drug_id].am;
  document.getElementById("text-noon").value  = selected_meds[drug_id].noon;
  document.getElementById("text-pm").value    = selected_meds[drug_id].pm;
   
}

function resetDosageContainers() {
  document.getElementById("text-am").value = null;
  document.getElementById("text-noon").value = null;
  document.getElementById("text-pm").value = null;
}

function deleteFromList(e, container_name) {
  delete selected_meds[e.id];
  displaySelected(container_name);

  if(container_name.match(/dosage-table-cell-left/i)){
    resetDosageContainers();
  }
}

function getMedication(search_str) {
  var url = apiProtocol+'://'+apiURL+':'+apiPort+'/api/v1/drugs';

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var objs = JSON.parse(this.responseText);
      renderResults(objs);
    }
  };
  xhttp.open("GET", (url + "?name=" + search_str), true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send();
}

function buildNavButtons() {
  var navContainer  = document.getElementById("main-table-cell-left");
  var navButtons    = [
    ["Medication","medication.png"],
    ["Dosage","dosage.png"],
    ["Duration","period.png"],
    ["Summary","prescription.png"]
  ];

  var navTable      = document.createElement("table");
  navTable.setAttribute("id","nav-table");

  for(var i = 0 ; i < navButtons.length ; i++){
    var tr  = document.createElement("tr");
    var td  = document.createElement("td");
    tr.appendChild(td);

    var img = document.createElement("img");
    img.setAttribute("src","../../assets/images/prescription/" + navButtons[i][1]);
    img.setAttribute("draggable", "false");
    img.setAttribute("class","icons");

    var a   = document.createElement("a");
    a.setAttribute("class","nav-buttons");
    a.setAttribute("id","nav-" + navButtons[i][0].toLowerCase());
    a.setAttribute("onmousedown","setPage(this);");
    
    if(i != 0)
      a.setAttribute("style","color: black; background-color: #dddddd;");
    
        
    var p = document.createElement("p");
    p.innerHTML = navButtons[i][0];
    a.appendChild(img);
    a.appendChild(p);

    td.appendChild(a);
    navTable.appendChild(tr);

  }
  
  navContainer.appendChild(navTable)
}

function setPage(e) {
  var buttons = document.getElementsByClassName("nav-buttons");

  for(var i = 0 ; i < buttons.length ; i++){
    buttons[i].style = "color: black; background-color: #dddddd;"
  }

  e.style = "color: white; background-color: #5ca6c4;";
  buildPage(e);
}

function buildPage(e) {
  var mainContainer = document.getElementById("main-table-cell-right");
  mainContainer.innerHTML = null;

  if(e.innerHTML.match(/Medication/i)) {
    buildMedicationSearch();
  }else if(e.innerHTML.match(/Dosage/i)) {
    buildDosage();
  }else if(e.innerHTML.match(/Duration/i)) {
    buildDuration();
  }else if(e.innerHTML.match(/Summary/i)) {
    buildSummary();
  }
}

function buildDosage() {
  var mainContainer = document.getElementById("main-table-cell-right");
  var table = document.createElement("div");
  table.setAttribute("class","dosage-table");
  mainContainer.appendChild(table);

  var tr = document.createElement("div");
  tr.setAttribute("class","dosage-table-row");
  table.appendChild(tr);

  var cells = ["left", "right"];
  
  for(var i = 0 ; i < cells.length ; i++){
    var td = document.createElement("div");
    td.setAttribute("class","dosage-table-cell");
    td.setAttribute("id","dosage-table-cell-" + cells[i]);
    tr.appendChild(td);
  }

    
  displaySelected("dosage-table-cell-left");  
  buildDosageKeyPad();
}

function buildDosageKeyPad() {
  var mainContainer = document.getElementById("dosage-table-cell-right");

  var table = document.createElement("table");
  table.setAttribute("id", "dosage-keypad-table");
  mainContainer.appendChild(table);

  tds = [["Am","morning.png"],["Noon","noon.png"], ["PM","evening.png"]]; 
  var tr = document.createElement("tr");
  table.appendChild(tr);

  for(var i = 0 ; i < tds.length ; i++){

    var th = document.createElement("th");
    tr.appendChild(th);

    var img = document.createElement("img");
    img.setAttribute("src","../../assets/images/prescription/" + tds[i][1]);
    img.setAttribute("draggable", "false");
    img.setAttribute("class","icons");
    th.appendChild(img);

    var p = document.createElement("p");
    p.innerHTML = tds[i][0];
    th.appendChild(p);
    
  }

  tr = document.createElement("tr");
  table.appendChild(tr);

  for(var i = 0 ; i < tds.length ; i++){
    
    var td = document.createElement("td");
    var inputBox = document.createElement("input");
    inputBox.setAttribute("type","text");
    inputBox.setAttribute("class","input-boxes");
    inputBox.setAttribute("onfocus","setKeyPadFocus(this)")
    inputBox.setAttribute("id","text-" + tds[i][0].toLowerCase());
    td.appendChild(inputBox);

    tr.appendChild(td);

  }


  tr = document.createElement("tr");
  table.appendChild(tr);

  
  td = document.createElement("td");
  td.setAttribute("colspan", 3);
  td.style = "text-align: center;";
  tr.appendChild(td)

  buildKeyPad(td);
}

function setKeyPadFocus(e) {
  var keys = document.getElementsByClassName("keypad-buttons");
  
  for(var i = 0 ; i < keys.length ; i++){
    keys[i].setAttribute("onmousedown", "dosageEntered(this,'" + e.id + "');");
  }

}

function getRowSelected(){
  var rows = document.getElementsByClassName("selected-meds-row");
  var row = null;
  for(var i = 0 ; i < rows.length ; i++){
    var styles = rows[i].style.backgroundColor;
    if(styles == "rgb(135, 206, 235)")
      row = rows[i];

  }
  return row;
}

function dosageEntered(key, text_box_id){
  var inputBox = document.getElementById(text_box_id);
  rowSelected = getRowSelected();

  if(!rowSelected)
    return;

  var drug_id = rowSelected.id.replace("row-","");

  try{

    if(key.innerHTML.match(/Del/i)){
      inputBox.value = inputBox.value.substring(0, inputBox.value.length - 1);
    }else if(key.innerHTML.match(/Clear/i)){
      inputBox.value = null;
    }else{
      inputBox.value += key.innerHTML;
    }

    if(text_box_id.match(/am/i)){
      selected_meds[drug_id].am = inputBox.value;
    }else if(text_box_id.match(/noon/i)){
      selected_meds[drug_id].noon = inputBox.value;
    }else if(text_box_id.match(/pm/i)){
      selected_meds[drug_id].pm = inputBox.value;
    }
  }catch(x) { }

}


function buildKeyPad(e){
  var table = document.createElement('table');
  table.setAttribute("class","prescription-keypad");

  /* ........................................ */
  /* ........................................ */

  var keypad_attributes = [];
  keypad_attributes.push([1,2,3]);
  keypad_attributes.push([4,5,6]);
  keypad_attributes.push([7,8,9]);
  keypad_attributes.push(["Del.",0,"."]);
  //keypad_attributes.push(["Clear","%","/"]);

  for(var i = 0 ; i < keypad_attributes.length ; i++) {
    var tr = document.createElement("tr");
    table.appendChild(tr);

    for(var j = 0 ; j < keypad_attributes[i].length ; j++){
      var td = document.createElement('td');
      tr.appendChild(td);

      var span = document.createElement('span');
      span.setAttribute("class","keypad-buttons");
      span.setAttribute("onmousedown","enterKeypadValue(this);");
      span.innerHTML = keypad_attributes[i][j];
      td.appendChild(span);
    }
  }

  e.appendChild(table);

}

function buildDuration() {
  var mainContainer = document.getElementById("main-table-cell-right");

  var table = document.createElement("table");
  table.setAttribute("id", "duration-table");

  var tr = document.createElement("tr");
  table.appendChild(tr)
  var td = document.createElement("td");
  tr.appendChild(td)

  var label = document.createElement("label");
  label.innerHTML = "Duration (days)"
  label.setAttribute("id","duration-label");
  td.appendChild(label);


  var tr = document.createElement("tr");
  table.appendChild(tr)
  var td = document.createElement("td");
  tr.appendChild(td)

  var inputBox = document.createElement("input");
  inputBox.setAttribute("type","text");
  inputBox.setAttribute("id","duration-text");
  inputBox.value  = setDuration;
  td.appendChild(inputBox);
  

  var tr = document.createElement("tr");
  table.appendChild(tr)
  var td = document.createElement("td");
  tr.appendChild(td)

  buildKeyPad(td);


  mainContainer.appendChild(table);

  var keys = document.getElementsByClassName("keypad-buttons");
  for(var i = 0 ; i < keys.length ; i++){
    keys[i].setAttribute("onmousedown","enterDuration(this);");
  }

}

var setDuration = null;

function enterDuration(key) {
  var inputBox = document.getElementById("duration-text");

  try{

    if(key.innerHTML.match(/Del/i)){
      inputBox.value = inputBox.value.substring(0, inputBox.value.length - 1);
    }else if(key.innerHTML.match(/Clear/i)){
      inputBox.value = null;
    }else{
      inputBox.value += key.innerHTML;
    }
    setDuration = inputBox.value;
  }catch(x) { }

}


function buildSummary() {
  var table = document.createElement("table");
  table.setAttribute("id","summary-table");

  var tr  = document.createElement("tr");
  table.appendChild(tr);
  var headers = ["Medication","Duration","Instruction","Total Quantity"];

  for(var i = 0 ; i < headers.length ; i++){
    var th = document.createElement("th");
    th.innerHTML = headers[i];
    th.setAttribute("class","summary-headers");
    if(i == 0 || i == 2)
      th.setAttribute("style","width: 30%;");

    tr.appendChild(th);
  }



  for(drug_id in selected_meds){
    var tr  = document.createElement("tr");
    var td = document.createElement("td");
    td.innerHTML = selected_meds[drug_id].name;
    tr.appendChild(td);
/*
    td = document.createElement("td");
    td.innerHTML = selected_meds[drug_id].dose_strength;
    tr.appendChild(td);

    td = document.createElement("td");
    td.innerHTML = selected_meds[drug_id].dose_strength;
    tr.appendChild(td);
*/
    td = document.createElement("td");
    td.innerHTML = setDuration;
    tr.appendChild(td);

    td = document.createElement("td");
    td.innerHTML = "<b>AM</b>: " + selected_meds[drug_id].am;
    td.innerHTML += " <b>Noon</b>: " + selected_meds[drug_id].noon;
    td.innerHTML += " <b>PM</b>: " + selected_meds[drug_id].pm;
    tr.appendChild(td);

    td = document.createElement("td");
    td.innerHTML = getTotalPillsNeed(drug_id) + " " + selected_meds[drug_id].units;
    tr.appendChild(td);
    table.appendChild(tr);
  }

  var mainContainer = document.getElementById("main-table-cell-right");
  mainContainer.appendChild(table);
}

function getTotalPillsNeed(drug_id) {
  var am    = parseFloat(selected_meds[drug_id].am);
  var noon  = parseFloat(selected_meds[drug_id].noon);
  var pm    = parseFloat(selected_meds[drug_id].pm);

  return (parseInt(setDuration)* (am + noon + pm));
}
