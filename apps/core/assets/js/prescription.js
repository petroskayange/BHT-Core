
function buildPrescriptionPage() {
  var iframe = document.getElementById("inputFrame" + tstCurrentPage);

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
  displaySelected();
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

  selected_meds[li.id] = li.innerHTML;
  displaySelected("results-divs-table-cell-right");  
}

function displaySelected(container_name) {
  var mainContainer = document.getElementById(container_name);
  mainContainer.innerHTML = null;
  var table = document.createElement("table");

  for(var drug_id in selected_meds){
    var row = document.createElement("tr");
    table.appendChild(row);

    var td = document.createElement("td");
    td.innerHTML = "&nbsp;"
    
    var img = document.createElement("img");
    img.setAttribute("src","../../assets/images/delete.png");
    img.setAttribute("draggable", "false");
    img.setAttribute("class","icons");
    td.appendChild(img);
    row.appendChild(td);

    var td = document.createElement("td");
    td.innerHTML = selected_meds[drug_id];
    row.appendChild(td);


  }

  mainContainer.appendChild(table);
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
  keypad_attributes.push(["Clear","%","/"]);

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
}

