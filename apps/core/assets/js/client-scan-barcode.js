var patient_index_url = "https://reqres.in/api/users?page=2";


function inserBarcodeScan() {
  try{
    var barcodeDiv = document.getElementsByClassName('barcode')[0];
  }catch(e){
    return;
  }

  var barcodeTable = document.createElement('table');
  barcodeTable.setAttribute('style','width: 100%;');

  var barcodeTR = document.createElement('tr');
  barcodeTable.appendChild(barcodeTR);

  var barcodeTD = document.createElement('td');
  barcodeTD.setAttribute('style',"vertical-align: middle; width: 50px;");
  barcodeTR.appendChild(barcodeTD);

  var img = document.createElement('img');
  img.setAttribute('src', "../assets/images/barcode.png");
  img.setAttribute('style','height: 97px; vertical-align: middle;');
  barcodeTD.appendChild(img);

  var barcodeTD = document.createElement('td');
  barcodeTD.setAttribute('style',"vertical-align: bottom; width: 80%;");
  barcodeTR.appendChild(barcodeTD);
  var inputText = document.createElement('input');
  inputText.setAttribute('type','text');
  inputText.setAttribute('id','client-identifier');
  inputText.setAttribute('style',"font-weight:bold;font-size:58px;margin-bottom: 15px;border-style: solid; border-width: 0px 0px 2px 0px; width: 99%; border-color: black;");
  inputText.setAttribute('onkeyup', "javascript:searchID(this);")
  barcodeTD.appendChild(inputText);
  barcodeTR.appendChild(barcodeTD);


  barcodeDiv.appendChild(barcodeTable);
}

function searchID(e) {
  var lastChar = e.value.substr(e.value.length - 1); 
  if(lastChar == '$') {
    postID(e.value.slice(0, -1));
    e.value = null;
  }
}

function autoFocus() {
  document.getElementById("client-identifier").focus();
}

function postID(identifier) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //document.location = "/confirm/" + this.responseText;
      var obj = JSON.parse(this.responseText);
      identifier = (obj['page']);
      document.location = "confirm.html?patient_id=" + identifier;
    }
  };
  xhttp.open("GET", patient_index_url + identifier, true);
  xhttp.send();
}


inserBarcodeScan();

setInterval(function() {
  autoFocus();
}, 100);
