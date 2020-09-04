document.addEventListener('DOMContentLoaded', e => {
    const errIn = document.querySelector('#error');
    if(errIn){
        let errVal = JSON.parse(errIn.value);
        errVal.forEach(({msg}) => M.toast({html: msg, classes:"red"}), 3000)
    }
})