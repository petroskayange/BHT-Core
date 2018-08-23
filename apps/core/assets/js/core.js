var scheme = "http://"
var port = ":" + "3000" + "/";
var ipAddress = "localhost";
var baseUrl = scheme + ipAddress + port;
if (document.createElement("template").content) {
    /*Code for browsers that supports the TEMPLATE element*/
    var namer = [];
    var iconImage = [];
    var description = [];
    var xmlhttp = new XMLHttpRequest();
    var xmlhttp2 = new XMLHttpRequest();
    let appDiv = document.getElementById("modal-div");
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            document.getElementById("modal-body");
            for (var i = 0; i < myArr.apps.length; i++) {
                namer[i] = myArr.apps[i].name;
                description[i] = myArr.apps[i].description;
                iconImage[i] = myArr.apps[i].icon;
                var keep = myArr.apps[i].folder;
                var mainurl = baseUrl + "/apps/config/apps.json";
                var file_url = baseUrl + "/apps/" + keep + "application.json";
                checkJson(file_url, baseUrl, namer[i], description[i],i, iconImage[i]);
            }
        }else if (this.status == 404) {
        	console.log("apps.json not available. Check if the file is present");
        }
    };
    xmlhttp.open("GET", "http://localhost:3000/apps/config/apps.json", true);
    xmlhttp.send();
} else {
    /*Alternative code for browsers that do not support the TEMPLATE element*/
}

function newApp(applicationName, applicationDescription, applicationImage, counter) {
    var temp = document.getElementById("card_template");
    var clon = temp.content.cloneNode(true);
    let appDiv = document.getElementById("modal-div");
    appDiv.appendChild(clon);
    let applicationNameNode = document.createTextNode(applicationName);
    let applicationDescriptionNode = document.createTextNode(applicationDescription);
    let appName = document.getElementById("appName");
    appName.id = "appName" + counter;
    appName.appendChild(applicationNameNode);
    let appDescription = document.getElementById("appDescription");
    appDescription.id = "appDescription" + counter;
    appDescription.appendChild(applicationDescriptionNode);
    let cardImage = document.getElementById("cardImage");
    cardImage.id = "cardImage" + counter;
    cardImage.setAttribute("src", applicationImage);
    cardImage.onerror = function() { 
    alert("Inserting alternate");
    cardImage.src = "http://localhost:3000/public/assets/images/no_image.png"; 
  }
}

function checkJson(file_url, baseUrl, namer, description, counter, iconUrl) {
    fetch(file_url)
        .then(res => res.json())
        .then((out) => {
            newApp(namer, description, baseUrl + iconUrl, counter);
            // console.log(namer);
        }).catch("no json available");
}
