var fetchedPrescriptions;
var ordersToPost;

function addModalDiv() {
  var iFrame    = document.getElementById("inputFrame" + tstCurrentPage);
  var modal = document.createElement("div");
  modal.setAttribute("class","modal");
  modal.setAttribute("id","prescription-modal");
  modal.setAttribute("data-backdrop","static");
  iFrame.appendChild(modal);

  var modal_content = document.createElement("div");
  modal_content.setAttribute("class","modal-content");
  modal_content.setAttribute("id","prescription-modal-content");
  modal.appendChild(modal_content)
}

function dispensingPage() {
  var iFrame    = document.getElementById("inputFrame" + tstCurrentPage);
  var helpText  = document.getElementById("helpText" + tstCurrentPage);
  iFrame.style = "height: 95%; width: 96%;";
  helpText.style = "display: none;";

  var demographics = document.createElement("div");
  demographics.setAttribute("class","demographics-table");

  var demographics_row = document.createElement("div");
  demographics_row.setAttribute("class","demographics-table-row");
  demographics.appendChild(demographics_row);

  var cells = ["left","right"];
  for(var i = 0 ; i < cells.length ; i++){
    var demographics_cell = document.createElement("div");
    demographics_cell.setAttribute("class","demographics-table-cell");
    demographics_cell.setAttribute("id","demographics-table-" + cells[i]);
    demographics_row.appendChild(demographics_cell);
  }

  iFrame.appendChild(demographics)
  buildDemographicsTable()

  buildMainControllers();

  addModalDiv();
}

function buildDemographicsTable(){
  mainContainer = document.getElementById("demographics-table-left");
  var table = document.createElement("table");
  table.setAttribute("class","demographics-table-data");

  var tr = document.createElement("tr");
  table.appendChild(tr);

  var td = document.createElement("td");
  td.setAttribute("class","names");
  td.setAttribute("id","gender-icon-td");
  var img = document.createElement("img");
  img.setAttribute("src","../../assets/images/male24x32.png");
  img.setAttribute("id","gender-icon");
  td.appendChild(img);
  tr.appendChild(td);

  var td = document.createElement("td");
  td.setAttribute("class","names");
  var span = document.createElement("span");
  span.innerHTML = "<b>Name:</b>";
  td.appendChild(span);
  tr.appendChild(td)
  
  
  mainContainer.appendChild(table);
  

  /* .................................................... */
  var table = document.createElement("table");
  table.setAttribute("class","demographics-table-data");

  var tr = document.createElement("tr");
  table.appendChild(tr);

  var th = document.createElement("th");
  th.setAttribute("class","data-header");
  
  var span = document.createElement("span");
  span.innerHTML = "<b>Birthdate:</b>";
  th.appendChild(span);


  tr.appendChild(th)




  mainContainer.appendChild(table);
}

function beautifyPop() {
  var modalDiv = document.getElementById('prescription-modal-content');
  modalDiv.innerHTML = null; 

  var mainContainer = document.createElement("div");
  mainContainer.setAttribute("class","keypad-container-table");
  modalDiv.appendChild(mainContainer);

  var mainContainerRow = document.createElement("div");
  mainContainerRow.setAttribute("class","keypad-container-table-row");
  mainContainer.appendChild(mainContainerRow);

  var cells = ["left", "right"];
  for(var i = 0 ; i < cells.length ; i++){
    var mainContainerCell = document.createElement("div");
    mainContainerCell.setAttribute("class","keypad-container-table-cell");
    mainContainerCell.setAttribute("id","keypad-container-table-cell-" + cells[i]);
    mainContainerRow.appendChild(mainContainerCell);
  }
}


function displayKeyPad(order_id) {
  beautifyPop();
  var modalDiv = document.getElementById('keypad-container-table-cell-left');
  var table = document.createElement('table');
  table.setAttribute("class","prescription-keypad");

  /* ........................................ */
  var tr  = document.createElement("tr");
  var td  = document.createElement("td");
  td.setAttribute("colspan","3");
  tr.appendChild(td);

  var input = document.createElement('input');
  input.setAttribute("type","text");
  input.setAttribute("id","prescription-input");
  input.setAttribute("class","touchscreenTextInput");
  td.appendChild(input);
  table.appendChild(tr);
  /* ........................................ */


  var keypad_attributes = [];
  keypad_attributes.push([1,2,3]);
  keypad_attributes.push([4,5,6]);
  keypad_attributes.push([7,8,9]);
  keypad_attributes.push(["Del.",0,"Clear"]);
  keypad_attributes.push(["&nbsp;","Dispense","&nbsp;"]);

  for(var i = 0 ; i < keypad_attributes.length ; i++) {
    var tr = document.createElement("tr");
    table.appendChild(tr);

    for(var j = 0 ; j < keypad_attributes[i].length ; j++){
      var td = document.createElement('td');
      tr.appendChild(td);

      var span = document.createElement('span');
      span.setAttribute("class","keypad-buttons");
      span.setAttribute("onmousedown","enterKeypadValue(this," + order_id + ");");
      span.innerHTML = keypad_attributes[i][j];
      if(keypad_attributes[i][j] == "&nbsp;"){
        span.setAttribute("class","keypad-buttons keypad-buttons-hide");
      }else{
        span.setAttribute("class","keypad-buttons");
      }
      td.appendChild(span);
    }
  }
 
  modalDiv.appendChild(table);
  document.getElementById('prescription-modal').style = "display: block;";

  addPopDescription(order_id);  
}

function addPopDescription(order_id) {
  var mainContainer = document.getElementById("keypad-container-table-cell-right");
  var table = document.createElement("table");
  table.setAttribute("id","popup-table");
   
  var tr = document.createElement("tr");
  var th = document.createElement("th");
  th.innerHTML = "Medication:"
  var td = document.createElement("td");
  td.setAttribute("id","medication-td");
  tr.appendChild(th)
  tr.appendChild(td)
  table.appendChild(tr);

  var tr = document.createElement("tr");
  var th = document.createElement("th");
  th.innerHTML = "Amount needed:"
  var td = document.createElement("td");
  td.setAttribute("id","amount-needed-td");
  tr.appendChild(th)
  tr.appendChild(td)
  table.appendChild(tr);

  var tr = document.createElement("tr");
  var th = document.createElement("th");
  th.innerHTML = "Amount dispensed:"
  var td = document.createElement("td");
  td.setAttribute("id","amount-dispensed-td");
  tr.appendChild(th)
  tr.appendChild(td)
  table.appendChild(tr);

  mainContainer.appendChild(table)

  var row = document.getElementById(order_id);
  var cells = row.getElementsByTagName("td");

  for(var j = 0 ; j < cells.length ; j++){
    if(j == 1){
      document.getElementById("medication-td").innerHTML = cells[j].innerHTML;
    }else if(j == 2){
      document.getElementById("amount-needed-td").innerHTML = cells[j].innerHTML;
    }else if(j == 3){
      document.getElementById("amount-dispensed-td").innerHTML = cells[j].innerHTML;
    }
  }

}

function enterKeypadValue(e, order_id) {
  var inputBox = document.getElementById('prescription-input');

  try{

    if(e.innerHTML.match(/Del/i)){
      inputBox.value = inputBox.value.substring(0, inputBox.value.length - 1);
    }else if(e.innerHTML.match(/Clear/i)){
      inputBox.value = null;
    }else if(e.innerHTML.match(/Dispense/i)){
      var amount_dispensed = document.getElementById("prescription-input").value;
      manualDispensation(order_id, amount_dispensed);
      document.getElementById("prescription-modal").style = "display: none;";
    }else{
      inputBox.value += e.innerHTML;
    }
  
  }catch(x) { }   
   
}

function buildMainControllers() {
  var iFrame    = document.getElementById("inputFrame" + tstCurrentPage);

  var mainContainer = document.createElement("div");
  mainContainer.setAttribute("class","controls-table");
  iFrame.appendChild(mainContainer);

  var mainContainerRow = document.createElement("div");
  mainContainerRow.setAttribute("class","controls-table-row");
  mainContainer.appendChild(mainContainerRow);


  var cells = ["left","right"];

  for(var i = 0 ; i < cells.length ; i++){
    var mainContainerCell = document.createElement("div");
    mainContainerCell.setAttribute("class","controls-table-cell");
    mainContainerCell.setAttribute("id","controls-table-cell-" + cells[i]);
    mainContainerRow.appendChild(mainContainerCell);
  }


  buildNavButtons();

  buildDispensingPage();
}

function manualDispensation(order_id, amount_dispensed) {
  postDispensation(order_id, amount_dispensed);
}

function scannedMedicationBarcode(barcode) {
  var drug_id   = barcode.split(" ")[0];
  var quantity  = barcode.split(" ")[1];

  var order_id = fetchedPrescriptions[drug_id];
  postDispensation(order_id, quantity);
}


function postDispensation(order_id , amount_dispensed) {
  if(isNaN(parseInt(order_id))) {
    return
  }

  if(isNaN(parseFloat(amount_dispensed))) {
    return
  }

  var drug_order = {
    dispensations: [{drug_order_id: order_id, quantity: amount_dispensed}]
  }
  submitParameters(drug_order, "/dispensations", "doneDispensing"); 
}

function doneDispensing(orders){
  getPrescriptions();
}

function addPrescriptions(data) {
  for(var i = 0 ; i < data.length ; i++){
    var order_id      = data[i].order_id;
    var drug_id       = data[i].drug_inventory_id;
    var medication    = data[i].drug.name;
    var amount_needed = 0;
    var quantity      = data[i].quantity;
   
    fetchedPrescriptions[drug_id] = order_id;
     
    setDataTable.row.add([addDeleteBTN(order_id), medication, amount_needed, quantity, addDispBTN(order_id)]).node().id = order_id;
    setDataTable.draw();
    addClassIMGcontainter(order_id);
  }
}

function addClassIMGcontainter(order_id) {
  var row = document.getElementById(order_id);
  var td = row.getElementsByTagName("td")[0];
  td.setAttribute("class","delete-container");
}

function addDispBTN(order_id) {
  //var row = document.getElementById(order_id);
  //row.setAttribute("onmousedown", "displayKeyPad('" + order_id + "');");
  var span = document.createElement("span");
  var btn  = document.createElement("button");
  btn.setAttribute("class","dispense-button btn btn-primary");
  btn.setAttribute("onmousedown","displayKeyPad('" + order_id + "');");
  btn.innerHTML = "Dispense";
  span.appendChild(btn); 
  return span.innerHTML;
}

function deleteOrder(row) {
  var order_id = row.id;
  alert(document.getElementById(order_id).innerHTML);
}

function addDeleteBTN(order_id) {
  var span = document.createElement("span");
  var img  = document.createElement("img");
  img.setAttribute("class","delete-icon");
  img.setAttribute("onmousedown","deleteOrder(this);");
  img.setAttribute("id", order_id);
  img.setAttribute("src", "../../assets/images/delete.png");
  span.appendChild(img); 
  return span.innerHTML;
}

function getPrescriptions() {
//  /api/v1/drug_orders?patient_id=1000&date=2018-12-31
  var url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1/drug_orders";

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var obj = JSON.parse(this.responseText);
      fetchedPrescriptions = {} 
      addPrescriptions(obj);
    }
  };
  xhttp.open("GET", (url + "?patient_id="+sessionStorage.patientID+"&date="+ moment().format('YYYY-MM-DD') ), true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send();
}

function buildDispensingPage() {
  var rightContainer = document.getElementById("controls-table-cell-right");

  var medList = document.createElement("div");
  medList.setAttribute("id","medList-container");

  var table = document.createElement("table");
  table.setAttribute("id","med-list");
  table.setAttribute("class","uk-table uk-table-hover uk-table-striped");
  var thead = document.createElement("thead");
  table.appendChild(thead);

  var tr = document.createElement("tr");
  thead.appendChild(tr);

  var headers = ["&nbsp;","Medication","Amount need","Amount dispensed","&nbsp;"];
  
  for(var i = 0 ; i < headers.length ; i++){
    var th = document.createElement("th");
    th.innerHTML = headers[i];
    if(i == 1)
      th.style = "width: 50%;"

    tr.appendChild(th);
  }

  var tbody = document.createElement("tbody");
  table.appendChild(tbody);

  medList.appendChild(table);
  rightContainer.appendChild(medList);


  /* ............................................. */

  var barcodeDiv = document.createElement("div");
  barcodeDiv.setAttribute("id","barcode-container");
  barcodeDiv.setAttribute("class","barcode");
  barcodeDiv.setAttribute("functionName","scannedMedicationBarcode");


  rightContainer.appendChild(barcodeDiv);
  inserBarcodeScan();
}


function buildNavButtons() {
  var navContainer  = document.getElementById("controls-table-cell-left");
  var navButtons    = [
    ["Prescribed","rx.png"],
    ["History","history.png"]
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
  leftContainer = document.getElementById("controls-table-cell-right");
  leftContainer.innerHTML = null;

  if(e.innerHTML.match(/Prescribed/i)) {
    buildDispensingPage();
    initDataTable();
    getPrescriptions();
  }else if(e.innerHTML.match(/History/i)) {
    buildMedicationHistory();
    initDataTable();
    loadHostory();
  }

}

function buildMedicationHistory() {
  var rightContainer = document.getElementById("controls-table-cell-right");

  var table = document.createElement("table");
  table.setAttribute("id","med-list");
  table.setAttribute("class","uk-table uk-table-hover uk-table-striped");
  var thead = document.createElement("thead");
  table.appendChild(thead);

  var tr = document.createElement("tr");
  thead.appendChild(tr);

  var headers = ["Medication","Date", "Amount dispensed"];
  
  for(var i = 0 ; i < headers.length ; i++){
    var th = document.createElement("th");
    th.innerHTML = headers[i];
    if(i == 0)
      th.style = "width: 50%;"

    tr.appendChild(th);
  }

  var tbody = document.createElement("tbody");
  table.appendChild(tbody);

  rightContainer.appendChild(table);

}

function loadHostory() {
  var url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1/drug_orders";

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var obj = JSON.parse(this.responseText);
      addRows(obj);
    }
  };
  xhttp.open("GET", (url + "?patient_id="+sessionStorage.patientID ), true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send();
}

function addRows(data){
  for(var i = 0 ; i < data.length ; i++){
    var order_id      = data[i].order_id;
    var drug_id       = data[i].drug_inventory_id;
    var medication    = data[i].drug.name;
    var quantity      = data[i].quantity;
    var start_date    = data[i].order.start_date;
    
    start_date        = formatDate(start_date);
     
    setDataTable.row.add([medication, start_date, quantity]).node().id = order_id;
    setDataTable.draw();
  }
}

function formatDate(date_str) {
  var passed_date = new Date(date_str);
  return moment(passed_date).format("DD/MMM/YYYY");
}
