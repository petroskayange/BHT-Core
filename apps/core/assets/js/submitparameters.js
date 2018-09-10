var functiontobecalled = null;


function getParameters(aUrl){

    var url = 'http://localhost:3001/api/v1' + aUrl;
    
    var req = new XMLHttpRequest();
    req.onreadystatechange = function(){
     
        if (this.readyState == 4 && this.status == 200) {
            functiontobecalled = eval(functiontobecalled);
            functiontobecalled(this.responseText);
        }    
    };
    try {
        req.open('GET', url, true);
        req.setRequestHeader('Authorization',sessionStorage.getItem("authorization"));
        req.send(null);
    } catch (e) {
        
    } 
}
