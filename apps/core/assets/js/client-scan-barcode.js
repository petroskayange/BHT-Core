var patient_index_url = null; //https://reqres.in/api/users?page=2";
var callbackFunction = null;
var img_base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADSUlEQVR4Xu1aS0tbURCeXG+hXbWWulD6A4IkCgpSsQoiKuIigeyykP4NpRstPuIf6I8o0i4FQfGdteIDSXyESOKz3VmQm9uZ4U4Wl16GXqk9sRn4MnPmnJt8kzOHczInUOsSUdqmwvUT/oj4BLUhacQXhINwKQCLGjs7OxCPx8Fk2d3dhba2NjJfIn4i7m0vACa/v7//+zyLRPz6n/hub2+F0mvEd0SFyDeI1wjyuo/wCvFcuJPhkuzt7TGwLZpxcHDA+vDwsOo7OjoisJ3L5Vjn83nWgpOTE9anp6esC4UCa0GxWGR9fn5e9ZVKpap9cXHB+vLy0r26unJXV1el7x3iLXG3lW9e7ABfwDPBz6n9bOvjLGqKEUJCENTG6V8iwy+WQkrzKQTVGdJIB5GPiLaUh/+UwGOlkD4DoPsI4YjqUAMTWAopsR9hhsKlph0qhcIv4lpNoXoKiVYDMGUfEDy1fUBfxAzzjxLmp5AS2BNKofpR4sH7QH0fMP8oIf6aTCHRpqZQ/ShRP0o85j5A+GspJPr/rkrUjxKWZTHEFgnwSduvBVo/ExK/3yd+8Qk3v0S82uid67qAdUke3NzcDOVy2YiCrm3b4DgO2Vxeb29vp673iALiWtnIjPPpa8DfXltbg66uLraTySSMjY2xPT09DSMjI5DJZKrtoaEhbo+OjkI6nYaVlRW6kOD+qakpGBgYgJmZGVheXoZYLFYlNTExAZ2dnWyPj49DR0eHcHn4D5rNzU1OKZLJyUlobW1lO5vNwuLiImxsbPDY7e1tWFpaooApGB63vr4OLS0tQLK1tcUBYYmcxrBfZmN2dhYaGxuBZG5uTmxtH9FPo1if51sRrOsD1vohlUoB3gFwX3d3NwwPD0Nvby+gcHtwcBD6+vogkUhw4Dc3N3B2dgbHx8fQ09MD/f39EI1Gxc/vRTI/P8+fgUIzKLYO/yLGSwST8j/ojixwEZtMXq+NLiwsQFNTk3Im0j9MJwWhyeOVlpiuaEmhD4jPUBuSQXxDFBHXNAMVxFdEFvEG8UIWt3lgrndyR4xwJQBy/EDIraVl4F8PXB9X0o5NL15U4OlnfuKGBXFP5D2uFSFqeWgQ8obOgGiHyBNq/t8qvwD7HjP2lQHmvAAAAABJRU5ErkJggg==";

function inserBarcodeScan() {
  try{
    var barcodeDiv = document.getElementsByClassName('barcode')[0];
    patient_index_url = barcodeDiv.getAttribute('url');
    functionName = barcodeDiv.getAttribute('functionName');
    callbackFunction = eval(functionName);

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
  img.setAttribute('src', img_base64);
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
      callbackFunction(this.responseText);
    }
  };
  xhttp.open("GET", patient_index_url + "?identifier=" + identifier, true);
  xhttp.send();
}


inserBarcodeScan();

setInterval(function() {
  autoFocus();
}, 100);
