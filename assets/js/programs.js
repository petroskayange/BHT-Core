

function setUpProgramPage() {
  var f = document.getElementById('inputFrame' + tstCurrentPage);
  f.style = 'width: 96%; height: 88%;';

  var div = document.createElement('div');
  div.setAttribute('class','main-table');
  f.appendChild(div);

  var row = document.createElement('div');
  row.setAttribute('class','table-row');
  div.appendChild(row);

  var cells = ['left','right'];
  for(var i = 0 ; i < cells.length ; i++){
    var cell = document.createElement('div');
    cell.setAttribute('class','table-cell');
    cell.setAttribute('id','cell-' + cells[i]);
    row.appendChild(cell);
  }
 
  fetchPrograms(); 
  var nextButton = document.getElementById('nextButton');
  nextButton.setAttribute('onmousedown', 'enroll();');
  nextButton.innerHTML = '<span>Enroll</span>';
}

var programsHash = {};

function addPrograms(programs) {
  var container = document.getElementById('cell-left');
  var table = document.createElement('table');
  table.setAttribute('class','program-tables');
  container.appendChild(table);

  for(var i = 0 ; i < programs.length ; i++){
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    td.setAttribute('class','program-names');
    td.setAttribute('id', programs[i].program.program_id);
    td.setAttribute('program-name', programs[i].program.name);
    td.setAttribute('onmousedown','showStates(this);');
    td.innerHTML = programs[i].program.name
    tr.appendChild(td);

    if(programsHash[programs[i].program.name] == undefined){
      programsHash[programs[i].program.name] = [];
    }

    programsHash[programs[i].program.name].push(programs[i].patient_states);
    table.appendChild(tr);
  }
}

function showStates(program){
  var container = document.getElementById('cell-right');
  container.innerHTML = null;
  var table = document.createElement('table');
  table.setAttribute('class','program-tables');
  container.appendChild(table);

  var program_states = programsHash[program.getAttribute('program-name')];

  for(var i = 0 ; i < program_states.length ; i++){
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    td.setAttribute('class','program-states');
    //console.log(states[i]);
    tr.appendChild(td);
    /* ...................... */
    buildStates(td, program_states[i]);
    /* ...................... */
    table.appendChild(tr);
  }

  var btns = document.getElementsByClassName('program-names');
  for(var i = 0 ; i < btns.length ; i++){
    btns[i].style = 'background-color: "";';
  }

  program.style = 'background-color: lightblue;';

  //Add program update state button
  var btn = document.createElement('button');
  btn.setAttribute('class','button blue navButton');
  btn.innerHTML = '<span>Update state</span>';
  btn.setAttribute('onmousedown','updateState(' + program.id + ');');

  var root = document.getElementById('buttons');
  root.appendChild(btn);
}

function updateState(program_id) {
  document.location = '/views/patient/update_state.html?program_id=' + program_id;
}

function buildStates(container, states) {
  var table = document.createElement('table');
  table.setAttribute('class','states');
  container.appendChild(table);

  for(var i = 0 ; i < states.length ; i++){
    var tr = document.createElement('tr');
    var th = document.createElement('th');
    th.innerHTML = 'State:';
    tr.appendChild(th);
    var td = document.createElement('td');
    td.innerHTML = stateName(states[i].state);
    tr.appendChild(td);
    table.appendChild(tr);

    var tr = document.createElement('tr');
    var th = document.createElement('th');
    th.innerHTML = 'Start date:';
    tr.appendChild(th);
    var td = document.createElement('td');
    td.innerHTML = moment(states[i].start_date).format('DD/MMM/YYYY');
    tr.appendChild(td);
    table.appendChild(tr);

    var tr = document.createElement('tr');
    var th = document.createElement('th');
    th.innerHTML = 'End date:';
    tr.appendChild(th);
    var td = document.createElement('td');
    try {
      if(states[i].end_date != null)
        td.innerHTML = moment(states[i].end_date).format('DD/MMM/YYYY');

    }catch(z) {}
    tr.appendChild(td);
    table.appendChild(tr);




  }
}

function stateName(num) {
  if(num == 7){
    return 'On ART';
  }else if(num == 3){
    return 'Died';
  }

  return num
}

function fetchPrograms() {
  var url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1/patients/";
  url += sessionStorage.patientID + "/programs";

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
      var objs = JSON.parse(this.responseText);
      addPrograms(objs);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send();
}

