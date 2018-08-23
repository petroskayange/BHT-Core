//declare your network configurations here
var applicationScheme = "http://"
var applicationPort = ":" + "3000"; //don't forget quotes  
var applicationUrl = "localhost"; 
var applicationBaseUrl = applicationScheme + applicationUrl + applicationPort;
// console.log(applicationBaseUrl); uncomment this out to verify current server settings
if (document.createElement("template").content) {
    /*Code for browsers that supports the TEMPLATE element*/
    var applicationName = [];
    var applicationIcon = [];
    var applicationDescription = [];
    var xmlhttp = new XMLHttpRequest();
    var xmlhttp2 = new XMLHttpRequest();
    let appDiv = document.getElementById("modal-div");
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            document.getElementById("modal-body");
            for (var i = 0; i < myArr.apps.length; i++) {
                applicationName[i] = myArr.apps[i].applicationName;
                applicationDescription[i] = myArr.apps[i].applicationDescription;
                applicationIcon[i] = myArr.apps[i].applicationIcon;
                var keep = myArr.apps[i].applicationFolder;
                var applicationJsonUrl = applicationBaseUrl + "/apps/" + keep + "application.json";
                checkJson(applicationJsonUrl, applicationBaseUrl, applicationName[i], applicationDescription[i],i, applicationIcon[i]);
            }
        }else if (this.status == 404) {
        	console.log("apps.json not available. Check if the file is present");
        }
    };
    xmlhttp.open("GET", applicationBaseUrl + "/apps/config/apps.json", true);
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
    console.log(applicationImage);
    alert("Inserting alternate");
    cardImage.src = applicationBaseUrl + "/public/assets/images/no_image.png"; 
  }
}

function checkJson(applicationJsonUrl, applicationBaseUrl, applicationName, applicationDescription, counter, applicationIconUrl) {
    fetch(applicationJsonUrl)
        .then(res => res.json())
        .then((out) => {
            newApp(applicationName, applicationDescription, applicationBaseUrl + applicationIconUrl, counter);
        }).catch("no json available");
}
