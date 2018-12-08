var resultsTableCSS = document.createElement("span");
resultsTableCSS.innerHTML = "<style>\
#results-table {\
  width: 100%;\
  overflow: auto;\
}\
.results-table-headers {\
  background-color: lightgrey;\
}\
.results-table-headers th {\
  text-align: left;\
  padding-left: 5px;\
}\
#orders-popup-div {\
  display: none;\
  background-color: #F4F4F4;\
  border: 2px solid #E0E0E0;\
  border-radius: 15px;\
  height: 92%;\
  padding: 5px;\
  position: absolute;\
  margin-top: 10px;\
  width: 95%;\
  left: 2%;\
  z-index: 991;\
}\
#orders-cover-div {\
  display: none;\
  position: absolute;\
  background-color: black;\
  width: 100%;\
  height: 102%;\
  left: 0%;\
  top: 0%;\
  z-index: 990;\
  opacity: 0.65;\
}\
#orders-nav-bar {\
  background-color: #333333;\
  height: 80px;\
  bottom: 0px;\
  position: absolute;\
  width: 99%;\
  border-radius: 0px 0px 9px 9px;\
}\
.nav-order-btns {\
  margin-top: 1% !important;\
  width: 150px;\
}\
#input-container {\
  margin-top: 0% !important;\
  height: 87%;\
  width: 100%;\
}\
</style>";

function buildOrderEntry() {
  var frame = document.getElementById('inputFrame' + tstCurrentPage);
  frame.style = 'width: 96%; height: 90%;';

  try {
    var clearBTN = document.getElementById('clearButton');
    clearBTN.style = 'display: none;';
  }catch(z) {}

  
  var coverDIV = document.createElement('div')
  coverDIV.setAttribute('id','orders-cover-div');

  var popUpDIV = document.createElement('div')
  popUpDIV.setAttribute('id','orders-popup-div');



  var nextBtn = document.getElementById('nextButton');
  nextBtn.innerHTML = '<span>Order</span>';
  nextBtn.setAttribute('onmousedown','orderTest();');


  var resultsTable = document.createElement('table');
  resultsTable.setAttribute('id','results-table');
  frame.appendChild(resultsTable);

  var thead = document.createElement('tbody');
  resultsTable.appendChild(thead);

  var tr = document.createElement('tr');
  tr.setAttribute('class','results-table-headers');
  thead.appendChild(tr);

  var tHeaders = ['Test','Order date','Result','Result date','Given to client'];
  for(var i = 0 ; i < tHeaders.length ; i++){
    var th = document.createElement('th');
    if(i == 1 || i == 3 || i == 4)
      th.style = 'text-align: center;';

    if(i == 2)
      th.style = 'text-align: right; padding-right: 5px;';

    th.innerHTML = tHeaders[i];
    tr.appendChild(th);
  }

  var tbody = document.createElement('tbody');
  tbody.setAttribute('id','lab-orders');
  resultsTable.appendChild(tbody);

  var hmtlBody = document.getElementsByTagName("body")[0];                        
  hmtlBody.appendChild(resultsTableCSS); 

  hmtlBody.appendChild(popUpDIV);
  hmtlBody.appendChild(coverDIV);

  getOrders();
}

function orderTest() {
  var popUpBox = document.getElementById('orders-popup-div');
  var coverDIV = document.getElementById('orders-cover-div');

  coverDIV.style = 'display: inline;';
  popUpBox.style = 'display: inline;';



  var ordersNavBar = document.createElement('div');
  ordersNavBar.setAttribute('id','orders-nav-bar');
  popUpBox.appendChild(ordersNavBar);


  var nextB = document.createElement('button');
  nextB.innerHTML = '<span>Next</span>';
  nextB.setAttribute('class','button green navButton nav-order-btns');
  ordersNavBar.appendChild(nextB);

  var cancelB = document.createElement('button');
  cancelB.innerHTML = '<span>Cancel</span>';
  cancelB.style = 'float: left; left: 5px;';
  cancelB.setAttribute('class','button red navButton nav-order-btns');
  cancelB.setAttribute('onmousedown','cancelOrder();');
  ordersNavBar.appendChild(cancelB);
  
  var orderDiv = document.createElement('div');
  orderDiv.setAttribute('id','input-container'); 
  popUpBox.appendChild(orderDiv);


  addOrders();
}



function addOrders() {
  var container = document.getElementById('input-container');

   var helpText = document.createElement('label');
   helpText.innerHTML = 'Lab orders';
   helpText.setAttribute('class','helpTextClass');
   container.appendChild(helpText);

  var serachR = document.createElement('div');
  serachR.style = "display: table;width: 100%;";
  container.appendChild(serachR);
  
  var serachRrow = document.createElement('div');
  serachRrow.style = "display: table-row;";
  serachR.appendChild(serachRrow);
  
  var serachRcell = document.createElement('div');
  serachRcell.style = "display: table-cell;";
  serachRrow.appendChild(serachRcell);

  var inputBox = document.createElement('input');
  inputBox.setAttribute('type','text');
//  inputBox.style = 'width: 100%;border-style: solid; border-width: 0px 0px 1px 0px;'
  //inputBox.style += 'height: 80px;';
  inputBox.setAttribute('class','touchscreenTextInput');
  serachRcell.appendChild(inputBox);
 
 
  var serachRrow = document.createElement('div');
  serachRrow.style = "display: table-row;";
  serachR.appendChild(serachRrow);
  
  var serachRcell = document.createElement('div');
  serachRcell.style = "display: table-cell;";
  serachRrow.appendChild(serachRcell);
  
  var viewPort = document.createElement('div');
  viewPort.setAttribute('class','options');
  var cssText = "border: solid 1px;border-radius: 0px 0px 9px 9px;";
  viewPort.style = cssText;
  serachRcell.appendChild(viewPort);

}









function cancelOrder() {
  document.getElementById('orders-popup-div').style = 'display: none;';
  document.getElementById('orders-cover-div').style = 'display: none;';
}








function getOrders() {
  var url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1";
  url += "/programs/1/lab_tests/orders?patient_id=" + sessionStorage.patientID;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
      var obj = JSON.parse(this.responseText);
      console.log(obj)
    }
  };
  xhttp.open("GET", url, true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send();
}

