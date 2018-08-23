//declare your network configurations here
var applicationScheme = "http://"
var applicationPort = ":" + "3000"; //don't forget quotes  
var applicationUrl = "localhost"; 
var applicationBaseUrl = applicationScheme + applicationUrl + applicationPort;
// console.log(applicationBaseUrl); uncomment this out to verify current server settings
if (document.createElement("template").content) {
    /*Code for browsers that supports the TEMPLATE element*/
    var applicationName = [];
    var applicationDescription = [];
    var applicationIcon = [];
    $.get(applicationBaseUrl+"/apps/config/apps.json")
    .done(function(data, status){ 
        var applicationData = jQuery.parseJSON(JSON.stringify(data));
        for (var i = 0; i < applicationData.apps.length; i++ ) {
            applicationName[i] = applicationData.apps[i].applicationName;
            applicationDescription[i] = applicationData.apps[i].applicationDescription;
            applicationIcon[i] = applicationData.apps[i].applicationIcon;
            var applicationFolder = applicationData.apps[i].applicationFolder;
            var applicationJsonUrl = applicationBaseUrl + "/apps/" + applicationFolder + "application.json";
            checkJson(applicationJsonUrl, applicationBaseUrl, applicationName[i], applicationDescription[i],i, applicationIcon[i]);
        }
    })
    .fail(function(){
    console.log("apps.json is missing from the apps/config folder");
    }); 
} else {
    /*Alternative code for browsers that do not support the TEMPLATE element*/
}

function newModuleCard(applicationName, applicationDescription, applicationImage, counter) {
    var temp = document.getElementById("card_template");
    var clon = temp.content.cloneNode(true);
    $("#modal-div").append($('#card_template').html());
    let cardImage = document.getElementById("cardImage");
    $("#appDescription").text(applicationDescription).attr('id',"appDescription" + counter);
    $("#appName").text(applicationName).attr('id',"appName" + counter);
    $("#cardImage")
    .on('error',function(){
        $(this).attr('src', backupImagebackupImage = applicationBaseUrl + "/public/assets/images/no_image.png");
    }).attr('src', applicationImage).attr('id',"cardImage" + counter);
}

function checkJson(applicationJsonUrl, applicationBaseUrl, applicationName, applicationDescription, counter, applicationIconUrl) {
    $.get(applicationJsonUrl)
    .done(function(){ 
    newModuleCard(applicationName, applicationDescription, applicationBaseUrl + applicationIconUrl, counter);
    })
    .fail(function(){
    console.log("The application " + applicationName + "'s application.json file is not available");
    });
}