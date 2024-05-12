    
    document.addEventListener('DOMContentLoaded', ()=>{
        document.getElementById("id").focus();
        
    });



    const submit = document.getElementById("submit");
    const spinner = document.getElementById("spinner");
    const id = document.getElementById("id");

    // update to config
    function CheckActivation() {
        var githubRepo = 'leevayle/inventory_activation_codes';
        var fileUrl = 'https://api.github.com/repos/' + githubRepo + '/contents/codes.txt';
        
        var access = 'Z2hwX3l2dUliRm9lOUpPbUxKYTQ1cllFRkpWT0RCczBGbDRNT09oaw==';      
        

        var accesst = atob(access);

        fetch(fileUrl, {
            headers: {
                Authorization: 'token ' + accesst
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json(); // Parse the response body as JSON
            } else {
                throw new Error('Failed to fetch codes.txt');
            }
        })
        .then(data => {
            
            var decodedContent = atob(data.content);
            
            var lines = decodedContent.split('\n');
            
            var userInput = id.value;
            
            var matchFound = false;
            for (var i = 0; i < lines.length; i++) {
                if (lines[i].trim() === userInput.trim()) {
                    matchFound = true;
                    break;
                }
            }
            
            if (matchFound) {
                
                successtext.textContent = 'Activation success enjoy!';
                success.style.display = 'flex';
                showNotif();

                spinner.style.opacity = "0"; 
                submit.textContent = "Activate";

                //ajax for database update
                
                
                setTimeout(() => {
                    location.href = "../index.html";
                }, 4000);

            } else {

                errortext.textContent = 'Wrong activation key';
                error.style.display = 'flex';
                showNotif();

                document.getElementById("id").focus();
                spinner.style.opacity = "0"; 
                submit.textContent = "Activate";
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // error.textContent = 'An error occurred';
            // error.style.display = 'flex';
            // showNotif();
        });
    }
    

    function checkInternetConnection() {
        fetch('https://www.google.com', { mode: 'no-cors' })
            .then(() => {

                infotext.textContent = 'Connecting to server';
                info.style.display = 'flex';
                showNotif();
                
                setTimeout(()=>{
                    CheckActivation();
                },3800);

            })
            .catch(() => {
                errortext.textContent = 'No Internet Connection!';
                error.style.display = 'flex';
                showNotif();

                document.getElementById("id").focus();
                spinner.style.opacity = "0"; 
                submit.textContent = "Activate";

            });
    };

    function Sanitize(){
        const idlength = id.value.length;

        if (idlength <= 10){

            infotext.textContent = 'Code is too short';
            info.style.display = 'flex';
            showNotif();

            document.getElementById("id").focus();
            spinner.style.opacity = "0"; 
            submit.textContent = "Activate";
        } else{
            checkInternetConnection();
        }
        
    };

    function Submitform(){        

        spinner.style.opacity = "1"; 
        submit.textContent = "";


        setTimeout(()=>{
            Sanitize();
        },1500);
        
    };
    
    
    function Validate(){

        if (!id.value){            

            warningtext.textContent = 'Kindly Enter Activation code';
            warning.style.display = 'flex';
            showNotif();

        } else{
            Submitform();            
        }
    };   

    

    submit.addEventListener('click', ()=>{
        Validate();

    });

    // enter shortcut
    document.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
          event.preventDefault();
          Validate();
        }
      });

    // Preview shortcuts
    document.addEventListener('keydown', function(event) {
        
        if (event.ctrlKey && event.key === '.') {
            
            if (id.type === 'text'){
                id.type = 'password';
        
            }
        }
        if (event.ctrlKey && event.key === ',') {
            
            if (id.type === 'password'){
                id.type = 'text';
        
            }
        }
    });
    
    

// Sincerely :) Leevayle@protonmail.com