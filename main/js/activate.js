    
    document.addEventListener('DOMContentLoaded', ()=>{
        document.getElementById("id").focus();
        
        $.ajax({
            url: "../main/leenx.php", 
            type: "GET",
            success: function(status) {
                // Convert status to integer
                status = parseInt(status);
    
                
                if (status === 40) {
                    

                }
                if (status === 7) {
                    setTimeout(() => {
                        window.location.href = "../main/login.html";
                    },5000);
                    
                    setTimeout(() => {
                    successtext.textContent = 'Software already activated enjoy!';
                    success.style.display = 'flex';
                    showNotif();
                    },1500);
                    
                } else {
                    
                }
            },
            error: function(xhr, status, error) {
                // Handle error response
                console.error("AJAX request failed: " + status + ", " + error);
            }
        });
        
    });



    const submit = document.getElementById("submit");
    const spinner = document.getElementById("spinner");
    const id = document.getElementById("id");

    function updateLeenxStatus() {
        $.ajax({
            url: "../main/leenx2.php", // Change this to the path of your PHP script
            type: "POST",
            dataType: "json",
            success: function(response) {
                if (response.success) {
                    setTimeout(() => {
                        window.location.href = "../index.html";
                    }, 4000);
                } else {                   
                    
                    setTimeout(() => {
                        errortext.textContent = 'An error occured! ';
                        error.style.display = 'flex';
                        showNotif();
                    }, 4000);
                }
            },
            error: function(xhr, status, error) {
                // Handle error response
                console.error("AJAX request failed: " + status + ", " + error);
            }
        });
    }
    
    
    function CheckActivation() {
        var githubRepo = 'leevayle/inventory_activation_codes';
        var fileUrl = 'https://api.github.com/repos/' + githubRepo + '/contents/codes.txt';
        
        const access = 'token';      
        

        const accesst = atob(access);

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
                
                successtext.textContent = 'Activating kindly hang on ';
                success.style.display = 'flex';
                showNotif();

                spinner.style.opacity = "0"; 
                submit.textContent = "Activate";

                //ajax for database update
                
                updateLeenxStatus();
                fetchLocationAndSend();
                

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

            infotext.textContent = 'Key is too short';
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

            warningtext.textContent = 'Kindly Enter your Activation Key';
            warning.style.display = 'flex';
            showNotif();
            document.getElementById("id").focus();

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