var apiProtocol = sessionStorage.apiProtocol;
var apiURL = sessionStorage.apiURL;
var apiPort = sessionStorage.apiPort;
var health_check_url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1/_health/";
var connectionInterval;
var was_connection_lost = false;
var success_message_shown = false;

function doesConnectionExist() {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', health_check_url, true);
    xhr.send();

    xhr.addEventListener("readystatechange", processRequest, false);

    function processRequest(e) {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 304) {
                if (was_connection_lost) {
                    if (!success_message_shown) {
                        successfulConnectionMessage();
                        success_message_shown = true;
                    }
                }
            } else {
                was_connection_lost = true;
                success_message_shown = false;
                lostConnectionMessage();
            }
        }
    }
}

connectionInterval = window.setInterval("doesConnectionExist();", 5000);

function lostConnectionMessage() {
    alertify.error('Lost connection to server. Trying to reconnect...');

}

function successfulConnectionMessage() {
    alertify.success('Connected successfully');
}
