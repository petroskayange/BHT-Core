function showProviderModal() {

    var providerModal = document.createElement('div');
    providerModal.setAttribute('id', 'provider-modal');
    providerModal.setAttribute('class', 'modal');

    var modalContent = document.createElement('div');
    modalContent.setAttribute('class', 'modal-content');
    providerModal.appendChild(modalContent);
    
    var modalHeader = document.createElement('div');
    modalHeader.setAttribute('class', 'modal-header');
    modalHeader.innerHTML= '<h2> Select provider </h2>';
    modalContent.appendChild(modalHeader);
    
    var modalBody = document.createElement('div');
    modalBody.setAttribute('id', 'provider-body');
    modalBody.setAttribute('class', 'modal-body');

    getProviders(modalBody); 
    
    modalContent.appendChild(modalBody);
    
    var modalFooter = document.createElement('div');
    modalFooter.setAttribute('class', 'modal-footer');
    modalFooter.innerHTML = '<span class="select-button" id="set-provider" disabled> select </span>'
    modalContent.appendChild(modalFooter);
    
    document.getElementById('content').appendChild(providerModal);
    
}

function getProviders(modalBody){
    var url = 'http://'+apiURL+':'+apiPort+'/api/v1/users?role=Superuser' ;
    var req = new XMLHttpRequest();
    req.onreadystatechange = function(){

    if (this.readyState == 4) {
    if (this.status == 200) {
        var items = JSON.parse(this.responseText);
        var ul = document.createElement('ul');
        for (let index = 0; index < items.length; index++) {
            var li = document.createElement('li');
            li.setAttribute('class', 'providers');
            li.innerHTML = items[index].username ; 
            try{
                li.innerHTML += ' (' + items[index].person.names[0].family_name + ' ' + items[index].person.names[0].family_name + ')';
            }catch(e) {

            }
            li.setAttribute('onclick', 'selectReason(this)');
            ul.appendChild(li);
        }

        modalBody.appendChild(ul);
    }
    }
    };
    try {
    req.open('GET', url, true);
    req.setRequestHeader('Authorization',sessionStorage.getItem('authorization'));
    req.send(null);
    } catch (e) {
}
}

function selectReason(element) {
        var items = document.getElementsByClassName("providers active");
        for (let index = 0; index < items.length; index++) {
            items[index].className = "providers";
        }
        element.className = "providers active"
        
}