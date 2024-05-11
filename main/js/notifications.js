//notifications
const success = document.getElementById('success');
var successtext = document.getElementById('successtext');
const closesuccess = document.getElementById('closesuccess');
const info = document.getElementById('info');
var infotext = document.getElementById('infotext');
const closeinfo = document.getElementById('closeinfo');
const error = document.getElementById('error');
var errortext = document.getElementById('errortext');
const closeerror = document.getElementById('closeerror');
const warning = document.getElementById('warning');
var warningtext = document.getElementById('warningtext');
const closewarning = document.getElementById('closewarning');
const notifycont = document.getElementById('notifications');


//overall animation
function showNotif(){
    navigator.vibrate([50,0,0,50]);
    notifycont.style.opacity = '1';
    setTimeout(()=>{
        hideNotif();
    },3000)
};

//hide the notification container
function hideNotif(){ 
    notifycont.style.opacity = '0';
    setTimeout(()=>{
        success.style.display = 'none';
        info.style.display = 'none';
        warning.style.display = 'none';
        error.style.display = 'none';
    },500);
};


//closing notifications
closesuccess.addEventListener('click',hideNotif);
closeinfo.addEventListener('click',hideNotif);
closewarning.addEventListener('click',hideNotif);
closeerror.addEventListener('click',hideNotif);