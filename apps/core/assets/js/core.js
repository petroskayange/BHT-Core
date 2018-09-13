//declare your network configurations here
// getAPI();

// window.addEvent('load', function() {
// var apiURL,apiPort =''; sessionStorage.getItem("apiURL");
// var apiPort =''; sessionStorage.getItem("apiPort");
var apiURL,apiPort, apiProtocol;
getAPI();
var url = window.location.href;
// var url_string = "http://www.example.com/t.html?a=1&b=3&c=m2-m3-m4-m5"; //window.location.href

// })
admin_tab_content = '<button class="btn btn-info overview-btns" id="create-user" onclick="redirect(this.id);"><span>Create user</span></button>';
admin_tab_content += '<button class="btn btn-info overview-btns" id="view-user" onclick="redirect(this.id); "><span>View user</span></button>';
report_tab_content = '<button class="btn btn-info overview-btns" id="report-1" "><span>Report 1</span></button>';
report_tab_content += '<button class="btn btn-info overview-btns" id="report-2" "><span>Report 2</span></button>';
report_tab_content += '<button class="btn btn-info overview-btns" id="report-3" "><span>Report 3</span></button>';
// alert(window.innerHeight);

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

function _ajaxUrl(res){
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

    $.post(apiProtocol + "://"+apiURL+":"+ apiPort+"/api/v1/auth/login",
    {
        username: "admin",
        password: "test"
    },
    function(data,status){

        if(status.toLocaleLowerCase() === "success") {
          sessionStorage.setItem(auth_token, data.authorization.token);
          
        }
        else {
        }
    });
}

function PersistData(data, res){
     
    var url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1/" + res;
    var req = new XMLHttpRequest();
    
    req.onreadystatechange = function() {
       
        if (req.readyState == 4  && req.status == 200) {
           // window.location.href = '/apps/core/views/patient_dashboard.html';
        } else {
           console.log("@@@@" + req.responseText);
       }
     }
  
    req.open('POST', url, true);
    req.setRequestHeader('Content-type','application/json');
    req.setRequestHeader('Authorization',sessionStorage.getItem("authorization"));
    req.send(JSON.stringify(data));

}

if (document.createElement("template").content) {
    /*Code for browsers that supports the TEMPLATE element*/
    var applicationName = [];
    var applicationDescription = [];
    var applicationIcon = [];
    var applicationFolder = [];
    var applicationJsonUrl = [];
    $.getJSON("/apps/config/apps.json")
        .done(function(data, status) {
            parser(data);
        })
        .fail(function() {
            console.log("apps.json is missing from the apps/config folder");
        });
} else {
    /*Alternative code for browsers that do not support the TEMPLATE element*/
}

function newModuleCard(applicationName, applicationDescription, applicationImage, counter) {
    $("#modal-div").append($('#card_template').html());
    $("#appDescription").text(applicationDescription).attr('id', "appDescription" + counter);
    $("#apptext").text(applicationName).attr('id', "apptext" + counter);
    $("#appName").text(applicationName).attr('id', "appName" + counter);
    $("#moduleButton").attr('id', "moduleButton" + counter);
    // $("#apptext").text(l("applicationName"));
    $("#cardImage")
        .on('error', function() {
            $(this).attr('src', "/public/assets/images/no_image.png");
        }).attr('src', applicationImage).attr('id', "cardImage" + counter);
    $("#moduleButton" + counter).click(function() {
        sessionStorage.setItem("applicationImage", applicationImage);
        sessionStorage.setItem("applicationName", applicationName);
        changeModule();
    });

 }
 function getName(user_id, url, port, protocol) {
    
    jQuery.getJSON({
        url: protocol+'://'+url+':' + port+ '/api/v1/users/'+user_id,
        data: { },
        type: 'GET',
        beforeSend: function(xhr){xhr.setRequestHeader('Authorization', sessionStorage.getItem('authorization'));},
        success: function(result) {
            var username = result.username;
            var allRoles = '';
            var roles_length = result.roles.length;
                for (let index = 0; index < roles_length; index++) {
                    allRoles = result.roles[index].role + ", "+ allRoles;
                }    
           var role = result.roles.role;
            var date_created = result.date_created;
            var given_name = result.person.names[0].given_name;
            var family_name = result.person.names[0].family_name;
            showUser(username,given_name, family_name, allRoles, date_created);

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


function checkJson(applicationJsonUrl, applicationName, applicationDescription, counter, applicationIconUrl) {
    $.get(applicationJsonUrl)
        .done(function() {
            newModuleCard(applicationName, applicationDescription,  applicationIconUrl, counter);
        })
        .fail(function() {
            console.log("The application " + applicationName + "'s application.json file is not available");
        });
}

function parser(applicationData) {

    for (var i = 0; i < applicationData.apps.length; i++) {
        
        applicationName[i] = applicationData.apps[i].applicationName || "Application Name Not Defined!!";
        applicationDescription[i] = applicationData.apps[i].applicationDescription || "No Description Available";
        applicationIcon[i] = applicationData.apps[i].applicationIcon;
        applicationFolder[i] = applicationData.apps[i].applicationFolder;
        if (applicationData.apps[i].applicationFolder) {
            applicationJsonUrl[i] =  "/apps/" + applicationFolder[i] + "application.json";
            checkJson(applicationJsonUrl[i], applicationName[i], applicationDescription[i], i, applicationIcon[i]);
        } else {
            console.log("no Application folder specified for " + applicationName[i]);
        }

    }
}

function changeModule() {
    let applicationImage = sessionStorage.getItem("applicationImage");
    let applicationName = sessionStorage.getItem("applicationName");
    if (applicationName != null && applicationImage != null) {
            $("#application-icon").attr("src",  sessionStorage.getItem("applicationImage") );
            $("#registerButton").css("visibility", "visible");
            if (sessionStorage.getItem("displayBarcode") == false || sessionStorage.getItem("displayBarcode") == null) {
                showBarcodeDiv();
               
            }else {
                
            }
           
            $("#myModal").modal("hide");
            $("#application-name").text(sessionStorage.getItem("applicationName"));
    }else {
    }
}
function showBarcodeDiv() {
    sessionStorage.setItem("displayBarcode", true)
    $("#details").width("47.91%");
    $("#header").append($('#barcode').html());
}
function redirect(id) {
    if (id === "create-user") {
        window.location.href = './apps/core/views/users/new.html';
    }
    if (id === "view-user") {
        window.location.href = './apps/core/views/users/view_users.html';
    }
    if (id === "report-1") {}
    if (id === "report-1") {}
}

function registerPatientRedirect() {
    window.location.href = './apps/core/views/patient/search.html';
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

    //Build an array containing Customer records.
    var header = new Array();
    header.push(["", "Today", "This Month", "This Year"]);
    //Create a HTML Table element.
    var table = document.createElement("TABLE");
    table.className = "table table-bordered";
    var columnCount = header[0].length;

    //Add the header row.
    var row = table.insertRow(-1);
    for (var i = 0; i < columnCount; i++) {
        var headerCell = document.createElement("TH");
        headerCell.innerHTML = header[0][i];
        row.appendChild(headerCell);
    }

    //Add the data rows.
    for (var i = 0; i < header.length; i++) {

        row = table.insertRow(-1);

        for (var j = 0; j < columnCount; j++) {
            var cell = row.insertCell(-1);
            //cell.innerHTML = header[i][j];
            if (i === 0 && j === 0) cell.innerHTML = "Total Registered";
        }

    }

    var dvTable = document.getElementById("generic_tabs");
    dvTable.innerHTML = "";
    dvTable.appendChild(table);
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

function loadTabContent(id) {
    if (id === "admin") {
        document.getElementById("generic_tabs").innerHTML = admin_tab_content;
    } else if (id === "report") {
        document.getElementById("generic_tabs").innerHTML = report_tab_content;
    } else {
        GenerateTable();
    }
}
function signIn() {
    checkCredentials(sessionStorage.getItem("username"), sessionStorage.getItem("userPassword"));
}

function checkCredentials(username, password) {
        jQuery.post(apiProtocol + '://' + apiURL + ':' + apiPort +'/api/v1/auth/login', {
            username: username,
            password: password
        })
        .done(function(msg) {
            sessionStorage.setItem("authorization", msg.authorization.token);
            window.location.href = "location.html";
            sessionStorage.removeItem("userPassword");
        })
        .fail(function(xhr, status, error) {
            // error handling
            showMessage("Wrong username or password");
            window.location = "/apps/core/views/login.html";
        });
}
function getAPI() {
jQuery.getJSON("/apps/config/apps.json")
.done(function(data, status) {
    sessionStorage.setItem("apiURL", data.apiURL);
    apiURL =  data.apiURL;
    sessionStorage.setItem("apiPort", data.apiPort);
    apiPort = data.apiPort;
    sessionStorage.setItem("apiProtocol", data.apiProtocol);
    apiProtocol = data.apiProtocol;
})
.fail(function() {
    console.log("apps.json is missing from the apps/config folder");
});
}
