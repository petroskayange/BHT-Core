//declare your network configurations here
// getAPI();

// window.addEvent('load', function() {
// var apiURL,apiPort =''; sessionStorage.getItem("apiURL");
// var apiPort =''; sessionStorage.getItem("apiPort");
var apiURL, apiPort, apiProtocol;
getAPI();
var url = window.location.href;
// var url_string = "http://www.example.com/t.html?a=1&b=3&c=m2-m3-m4-m5"; //window.location.href
// var activities_tab_content = "";
// })
admin_tab_content = '<button class="btn btn-info overview-btns" id="create-user" onclick="redirect(this.id);"><span>Create user</span></button>';
admin_tab_content += '<button class="btn btn-info overview-btns" id="view-user" onclick="redirect(this.id); "><span>View user</span></button>';
report_tab_content = '<button class="btn btn-info overview-btns" id="report-1" "><span>Report 1</span></button>';
report_tab_content += '<button class="btn btn-info overview-btns" id="report-2" "><span>Report 2</span></button>';
report_tab_content += '<button class="btn btn-info overview-btns" id="report-3" "><span>Report 3</span></button>';
// alert(window.innerHeight);

var addDiv = "<div class='col-sm-2 tasks'>";
var endDiv = "</div>"
                          
// activities_tab_content += addDiv +'<button id="national-id" class="taskBtns"><span>National ID(Print)</span></button>';
// activities_tab_content += endDiv +addDiv+ '<button  id="visit-summary" class="taskBtns"><span>Visit Summary(Print)</span></button>';  
// activities_tab_content += endDiv + addDiv+'<button  id="demographics-print" class="taskBtns"><span>Demographics(Print)</span></button>';    
// activities_tab_content += endDiv + addDiv+'<button id="demographics-edit" onclick="activitiesRedirect(this.id);" class="taskBtns"><span>Demographics(Edit)</span></button>' + endDiv;


// URL formulation logic
var auth_token = null;

if (sessionStorage.getItem("applicationName") !== null) {
    showBarcodeDiv();
}
// sessionStorage.setItem("displayBarcode", false);

var userApi = "user";

var firstName = "firstname";

var lastName = "lastname";

var homeDistrict = "homedistrict";

var homeVillage = "homevillage";

var currentDistrict = "currentdistrict";

var currentTA = "currentta";

var homeTA = "homeTA";

var currentVillage = "currentvillage";

var roles = "roles";

var people = "people";

var person_addresses = "person_addresses";

var person_names = "person_names";
var activitiesName = [];
var activitiesDescription = [];
var activitiesIcon = [];
var applicationName = [];
var applicationDescription = [];
var applicationIcon = [];
var applicationFolder = [];
var applicationJsonUrl = [];
var programID = [];

function _ajaxUrl(res) {
    var result = [];
    $.getJSON({
        url: apiProtocol + '://' + apiURL + ':' + apiPort + '/api/v1/' + res,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', sessionStorage.getItem(auth_token));
        },
        success: function (data) {
            result = data;
        },
        error: function () {
            console.log('error message');
        }
    });

    return result;
}


function loadDoc() {

    $.post(apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1/auth/login", {
            username: "admin",
            password: "test"
        },
        function (data, status) {

            if (status.toLocaleLowerCase() === "success") {
                sessionStorage.setItem(auth_token, data.authorization.token);

            } else {}
        });
}

function PersistData(data, res) {

    var url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1/" + res;
    var req = new XMLHttpRequest();

    req.onreadystatechange = function () {

        if (req.readyState == 4 && req.status == 200) {
            // window.location.href = '/views/patient_dashboard.html';
        } else {
            console.log("@@@@" + req.responseText);
        }
    }

    req.open('POST', url, true);
    req.setRequestHeader('Content-type', 'application/json');
    req.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
    req.send(JSON.stringify(data));

}

function generateTemplate() {
    if (document.createElement("template").content) {
        /*Code for browsers that supports the TEMPLATE element*/
     
        $.getJSON("/config/config.json")
            .done(function (data, status) {
                parser(data);
            })
            .fail(function () {
                console.log("config.json is missing from the apps/config folder");
            });
    } else {
        /*Alternative code for browsers that do not support the TEMPLATE element*/
    }
}
function generateActivities() {
    if (document.createElement("template").content) {
        /*Code for browsers that supports the TEMPLATE element*/
     
        $.getJSON("/apps/BHT-Core-Apps-ART/application.json")
            .done(function (data, status) {
                getActivities(data);
            })
            .fail(function () {
                console.log("application.json is missing from the /apps/BHT-Core-Apps-ART folder");
            });
    } else {
        /*Alternative code for browsers that do not support the TEMPLATE element*/
    }
}
function _foo(data, resource) {

    var url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1/" + resource;
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(JSON.parse(this.responseText));
        } else {
            //
        }
    }

    xhr.open('GET', url, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader("Authorization", sessionStorage.getItem("authorization"));
    xhr.send(null);

}

function newModuleCard(applicationName, applicationDescription, applicationImage, counter, url) {
    $("#modal-div").append($('#card_template').html());
    $("#appDescription").text(applicationDescription).attr('id', "appDescription" + counter);
    $("#apptext").text(applicationName).attr('id', "apptext" + counter);
    $("#appName").text(applicationName).attr('id', "appName" + counter);
    $("#moduleButton").attr('id', "moduleButton" + counter);
    if (url == "") {
        $("#moduleButton"+counter).attr("href", "#");    
    }else {
        $("#moduleButton"+counter).attr("href", url);
    }
   
    
    // $("#apptext").text(l("applicationName"));
    $("#cardImage")
        .on('error', function () {
            $(this).attr('src', "/assets/images/no_image.png");
        }).attr('src', applicationImage).attr('id', "cardImage" + counter);
    $("#moduleButton" + counter).click(function () {
        sessionStorage.setItem("applicationImage", applicationImage);
        sessionStorage.setItem("applicationName", applicationName);
        sessionStorage.setItem("programID", programID);
        changeModule();
    });

}

function newActivitiesCard(activitiesName, activitiesDescription, activitiesImage, counter, url) {
    $("#activities-modal-div").append($('#activities_template').html());
    $("#activityDescription").text(activitiesDescription).attr('id', "activityDescription" + counter);
    $("#activitytext").text(activitiesName).attr('id', "activitytext" + counter);
    $("#activityName").text(activitiesName).attr('id', "activityName" + counter);
    $("#moduleButton").attr('id', "moduleButton" + counter);
    
    $("#cardImage")
        .on('error', function () {
            $(this).attr('src', "/assets/images/no_image.png");
        }).attr('src', activitiesImage).attr('id', "cardImage" + counter);
    $("#moduleButton" + counter).click(function () {
        sessionStorage.setItem("activitiesName", activitiesName);
        sessionStorage.setItem("activitiesImage", activitiesImage);
        changeActivities();
    });

}

function getName(user_id, url, port, protocol) {

    jQuery.getJSON({
        url: protocol + '://' + url + ':' + port + '/api/v1/users/' + user_id,
        data: {},
        type: 'GET',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', sessionStorage.getItem('authorization'));
        },
        success: function (result) {
            var username = result.username;
            var allRoles = '';
            var roles_length = result.roles.length;
            for (var index = 0; index < roles_length; index++) {
                allRoles = result.roles[index].role + ", " + allRoles;
            }
            var role = result.roles.role;
            var date_created = result.date_created;
            var given_name = result.person.names[0].given_name;
            var family_name = result.person.names[0].family_name;
            showUser(username, given_name, family_name, allRoles, date_created);

        }
    });
}

function showUser(username, given_name, family_name, role, date_created) {

    document.getElementById("first_name").innerHTML = given_name;
    document.getElementById("last_name").innerHTML = family_name;
    document.getElementById("username").innerHTML = username;
    document.getElementById("role").innerHTML = role;
    document.getElementById("date_created").innerHTML = date_created;
}

function setUser() {
    var given_name = document.getElementById("first_name").textContent;
    var family_name = document.getElementById("last_name").textContent;
    var username = document.getElementById("username").textContent;
    sessionStorage.setItem("given_name", given_name);
    sessionStorage.setItem("family_name", family_name);
    sessionStorage.setItem("username", username);
}

function checkJson(applicationJsonUrl, applicationName, applicationDescription, counter, applicationIconUrl, programID) {
    $.getJSON(applicationJsonUrl)
        .done(function (data) {
        newModuleCard(applicationName, applicationDescription, applicationIconUrl, counter, "");
            
        })
        .fail(function () {
            console.log("The application " + applicationName + "'s application.json file is not available");
        });
}

function checkActivities(applicationJsonUrl, activitiesName, activitiesDescription, counter, activitiesIconUrl) {
    // $.getJSON(applicationJsonUrl)
    //     .done(function (data) {
        newActivitiesCard(activitiesName, activitiesDescription, activitiesIconUrl, counter, "");
            
       
}

function parser(applicationData) {

    for (var i = 0; i < applicationData.apps.length; i++) {

        applicationName[i] = applicationData.apps[i].applicationName || "Application Name Not Defined!!";
        applicationDescription[i] = applicationData.apps[i].applicationDescription || "No Description Available";
        applicationIcon[i] = applicationData.apps[i].applicationIcon;
        applicationFolder[i] = applicationData.apps[i].applicationFolder;
        programID[i]  = applicationData.apps[i].programID;

        if (applicationData.apps[i].applicationFolder) {
            applicationJsonUrl[i] = "/apps/" + applicationFolder[i] + "application.json";
            checkJson(applicationJsonUrl[i], applicationName[i], applicationDescription[i], i, applicationIcon[i], programID[i]);
        } else {
            console.log("no Application folder specified for " + applicationName[i]);
        }

    }
}

function getActivities(activitiesData) {

    for (var i = 0; i < activitiesData.others.length; i++) {

        activitiesName[i] = activitiesData.others[i].activitiesName || "Activities Name Not Defined!!";
        activitiesDescription[i] = activitiesData.others[i].activitiesDescription || "No Description Available";
        activitiesIcon[i] = activitiesData.others[i].activitiesIcon;
        applicationFolder[i] = activitiesData.others[i].applicationFolder;
        checkActivities(applicationJsonUrl[i], activitiesName[i], activitiesDescription[i], i, activitiesIcon[i]);

    }
}

function changeModule(url ) {
    var applicationImage = sessionStorage.getItem("applicationImage");
    var applicationName = sessionStorage.getItem("applicationName");
    if (applicationName != null && applicationImage != null) {
        $("#application-icon").attr("src", sessionStorage.getItem("applicationImage"));
        $("#registerButton").css("visibility", "visible");
        if (sessionStorage.getItem("displayBarcode") == false || sessionStorage.getItem("displayBarcode") == null) {
            // showBarcodeDiv();

        } else {

        }

        $("#myModal").modal("hide");
        $("#application-name").text(sessionStorage.getItem("applicationName"));
    } else {}
}

function changeActivities(url ) {
    var activitiesImage = sessionStorage.getItem("activitiesImage");
    var activitiesName = sessionStorage.getItem("activitiesName");
    if (activitiesName != null && activitiesImage != null) {
        $("#activities-icon").attr("src", sessionStorage.getItem("activitiesImage"));
        if (sessionStorage.getItem("displayBarcode") == false || sessionStorage.getItem("displayBarcode") == null) {
            // showBarcodeDiv();

        } else {

        }

        $("#myModal").modal("hide");
        $("#activities-name").text(sessionStorage.getItem("activitiesName"));
    } else {}
}

function showBarcodeDiv() {
    sessionStorage.setItem("displayBarcode", true)
    $("#details").width("47.91%");
    $("#header").append($('#barcode').html());
}

function redirect(id) {
    if (id === "create-user") {
        window.location.href = './views/users/new.html';
    }
    if (id === "view-user") {
        window.location.href = './views/users/view_users.html';
    }
    if (id === "report-1") {}
    if (id === "report-1") {}
}
function activitiesRedirect(id) {
    if (id === "demographics-edit") {
        window.location.href = './views/patient/activities.html';
    }
    if (id === "national-id") {}
    if (id === "visit-summary") {}
    if (id === "demographics-print") {}
}

function registerPatientRedirect() {
    window.location.href = './views/patient/search.html';
}
// overview tab work in progress
function overview() {
    var table = document.createElement("TABLE");
    table.className = "table table-bordered";
    var row = table.insertRow(-1);
    var total_columns = 4;
    var total_rows = 7;
    var table_header = ["", "Today", "This Month", "This Year"]

    for (var x = 0; x < total_columns; x++) {
        var header = document.createElement("TH");
        header.innerHTML = table_header[x];
        row.appendChild(header);
        for (var i = 0; i < total_rows; i++) {
            var cell = row.insertCell(-1);
            // cell.className = 'overview-tab';
            if (x === 0 && i === 1) cell.innerHTML = "Total Registered";
            if (x === 1 && i === 2) cell.innerHTML = '&nbsp';
            if (x === 2 && i === 3) cell.innerHTML = '&nbsp';
            if (x === 3 && i === 4) cell.innerHTML = '&nbsp';
            if (x === 4 && i === 5) {
                cell.setAttribute('span', 3);
                cell.innerHTML = "Current Patient Statistics";

            }
        }
    }

    var divtable = document.getElementById("generic_tabs");
    divtable.appendChild(table);
}

function GenerateTable() {
  var dvTable = document.getElementById("generic_tabs");
  dvTable.innerHTML = "";


  //<object data="framed.html" type="text/html"><p>This is the fallback code!</p></object>
  var obj = document.createElement("object");
  obj.setAttribute("data", "/apps/ART/views/overview.html");
  obj.setAttribute("type","text/html");
  obj.setAttribute("style","width: 99%; height: 500px; text-align: left;");

  dvTable.style = "height: 430px; width: 98% !important; margin: 15px;";
  dvTable.appendChild(obj);
}
// overview tab work in progress
function showOptions(e) {
    // Get all buttons with class="btn" inside the container
    var btns = document.getElementsByClassName("overview-btns");

    // Loop through the buttons and add the active class to the current/clicked button
    for (var i = 0; i < btns.length; i++) {
        btns[i].setAttribute('class', 'btn btn-info overview-btns');
        if (btns[i].innerHTML == e.innerHTML)
            btns[i].setAttribute('class', 'btn btn-info overview-btns active-btn');
    }

}

function showActivities(a) {
    var btn = document.getElementsByClassName("activities-btns");

    // Loop through the buttons and add the active class to the current/clicked button
    for (var x = 0; x < btn.length; x++) {
        btn[x].setAttribute('class', 'btn btn-info activities-btns');
    }
}

function loadTabContent(id) {
    if (id === "admin") {
        document.getElementById("generic_tabs").innerHTML = admin_tab_content;
    } else if (id === "report") {
        document.getElementById("generic_tabs").innerHTML = report_tab_content;
    } else {
        GenerateTable();
    }
}

// function loadActivitiesContent(id) {
//     if (id === "activities") {
//         document.getElementById("generic_tabs").innerHTML = activities_tab_content;
//     }
// }

function signIn() {
    checkCredentials(sessionStorage.getItem("username"), sessionStorage.getItem("userPassword"));
}

function checkCredentials(username, password) {
    var http = new XMLHttpRequest();
    var url = apiProtocol + '://' + apiURL + ':' + apiPort + '/api/v1/auth/login';
    var params = JSON.stringify({
        username: username,
        password: password
    });
    http.open('POST', url, true);
    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/json');
    http.onreadystatechange = function () { //Call a function when the state changes.
        if (http.readyState == 4) {
            if (http.status == 200) {
                var v = JSON.parse(http.responseText);
                sessionStorage.setItem("authorization", v.authorization.token);
                sessionStorage.removeItem("userPassword");
                window.location.href = "location.html";
                // sessionStorage.removeItem("userPassword");
                // window.location.href = 'show.html?user_id=' + v.user.user_id;
            } else if (http.status == 401) {
                // alert('Username already exists');
                sleep(2000);
                showMessage("Wrong username or password");
                window.location = "/views/login.html";
                // sleep
            } else if (http.status == 0){
                // await sleep(2000);
                showMessage('No connection to EMR API',null,10000000000);
                window.location = "/views/login.html";
            }else {
                showMessage('error' + http.status);
            }
        }
    }
    http.setRequestHeader('Authorization', sessionStorage.getItem('authorization'));
    http.send(params);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function getAPI() {

    var url = '/config/config.json';
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {

        if (this.readyState == 4) {
            
            if (this.status == 200) {
                try {
                    var data = JSON.parse(this.responseText);
                    sessionStorage.setItem("apiURL", data.apiURL);
                    apiURL = data.apiURL;
                    sessionStorage.setItem("apiPort", data.apiPort);
                    apiPort = data.apiPort;
                    sessionStorage.setItem("apiProtocol", data.apiProtocol);
                    apiProtocol = data.apiProtocol;
                } catch(e) {
                    console.log("invalid json formatting");
                }
                
            }else if(this.status == 404) {
                console.log("config.json is missing from the /config folder");
            }else {
                console.log("error " + this.status);
            }
        }
    };
    try {
        req.open('GET', url, true);
        req.send(null);
    } catch (e) {
        console.log(e);
    }

}
