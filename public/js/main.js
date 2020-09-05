document.addEventListener('DOMContentLoaded', e => {
            
    const errIn = document.querySelector('#errors');
    const errOne = document.querySelector('#error');
    const msgIn = document.querySelector('#success_msg');
    const msgerr = document.querySelector('#error_msg');
    if(errIn){
        let errVal = JSON.parse(errIn.value);
        errVal.forEach(({msg}) => 
        M.toast({html: `<h5>${msg}</h5>`, classes:"red rounded"}, 5000))
    }
    if(msgIn){
        M.toast({html: `<h5>${msgIn.value}</h5>`, classes:"green rounded"}, 5000)
    }
    if(errOne){
        M.toast({html: `<h5>${errOne.value}</h5>`, classes:"red rounded"}, 5000)
    }
    if(msgerr){
        M.toast({html: `<h5>${msgerr.value}</h5>`, classes:"red rounded"}, 5000)
    }
})