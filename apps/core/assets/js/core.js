//declare your network configurations here
var applicationScheme = "http://"
var applicationPort = ":" + "3000"; //don't forget quotes  
var applicationUrl = "0.0.0.0";
var applicationBaseUrl = applicationScheme + applicationUrl + applicationPort;
admin_tab_content = '<button class="btn btn-info overview-btns" id="create-user" onclick="redirect(this.id);"><span>Create user</span></button>';
admin_tab_content += '<button class="btn btn-info overview-btns" id="view-user" onclick="redirect(this.id); "><span>View user</span></button>';
report_tab_content = '<button class="btn btn-info overview-btns" id="report-1" "><span>Report 1</span></button>';
report_tab_content += '<button class="btn btn-info overview-btns" id="report-2" "><span>Report 2</span></button>';
report_tab_content += '<button class="btn btn-info overview-btns" id="report-3" "><span>Report 3</span></button>';
// alert(window.innerHeight);

// URL formulation logic
var APIURL = "localhost:8000/api/v1/";

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

function _ajaxUrl(filter_value, search_string){
  console.log(APIURL + filter_value + "&search_string=" + search_string);
}

// end of url formulation logic

var userRoles = ['admin', 'clerk', 'user'];
$('#userRole').empty();
$.each(userRoles, function(i, p) {
    $('#userRole').append($('<option></option>').val(p).html(p));
});
if (document.createElement("template").content) {
    /*Code for browsers that supports the TEMPLATE element*/
    var applicationName = [];
    var applicationDescription = [];
    var applicationIcon = [];
    var applicationFolder = [];
    var applicationJsonUrl = [];
    console.log("/apps/config/apps.json");
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
        // console.log(applicationImage);
        localStorage.setItem("applicationImage", applicationImage);
        localStorage.setItem("applicationName", applicationName);
        changeModule();
    });

    if ((counter%3)== 0 && counter != 0) {
        console.log("ready to append" + counter);
        $("#modal-div").append($('<div></div>'));

    }else {
        console.log("not ready to append" + counter);
    }
}

function showUser() {
    $("#first_name").text(localStorage.getItem("first_name"));
    $("#last_name").text(localStorage.getItem("last_name"));
    $("#username").text(localStorage.getItem("username"));
    $("#role").text(localStorage.getItem("selected_role"));
    $("#date_created").text(localStorage.getItem("date_created"));
    console.log(localStorage);
}

function checkJson(applicationJsonUrl, applicationBaseUrl, applicationName, applicationDescription, counter, applicationIconUrl) {
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
            checkJson(applicationJsonUrl[i], applicationBaseUrl, applicationName[i], applicationDescription[i], i, applicationIcon[i]);
        } else {
            console.log("no Application folder specified for " + applicationName[i]);
        }

    }
}

function changeModule() {
    let applicationImage = localStorage.getItem("applicationImage");
    let applicationName = localStorage.getItem("applicationName");
    if (applicationName != null && applicationImage != null) {
            $("#application-icon").attr("src",  localStorage.getItem("applicationImage") );
            // $(this).attr('src', "/public/assets/images/no_image.png");
            $("#registerButton").css("visibility", "visible");
            $("#myModal").modal("hide");
            $("#application-name").text(localStorage.getItem("applicationName"));
            console.log(localStorage);
    }else {
        console.log(localStorage);
    }
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