    
    document.addEventListener('DOMContentLoaded', ()=>{
        document.getElementById("id").focus();
        document.getElementById("spinner").addEventListener('contextmenu', (e)=>{
            event.preventDefault();
        });

        function checkLeenxStatus() {
            $.ajax({
                url: "leenx.php", // Change this to the path of your PHP script
                type: "GET",
                success: function(status) {
                    // Convert status to integer
                    status = parseInt(status);
        
                    // Load different pages based on status
                    if (status === 40) {
                        // Status is 40, load page 1
                        window.location.href = "../install/activate.html";
                    }
                    if (status === 7) {
                        
                    } else {
                        
                    }
                },
                error: function(xhr, status, error) {
                    // Handle error response
                    console.error("AJAX request failed: " + status + ", " + error);
                }
            });
        }
        checkLeenxStatus();
    });



    const submit = document.getElementById("submit");
    const spinner = document.getElementById("spinner");
    const id = document.getElementById("id");
    const password = document.getElementById("password");

    function Clearform(){
        setTimeout(()=>{
            id.value = "";
            password.value = "";
        },1550);
        
    };

    function Sanitize(){
        const idlength = id.value.length;

        if (idlength>10){

            infotext.textContent = 'Id is too long (max is 10)';
            info.style.display = 'flex';
            showNotif();

            document.getElementById("id").focus();
            spinner.style.opacity = "0"; 
            submit.textContent = "Submit";
        }
    };

    function Submitform(){        

        spinner.style.opacity = "1"; 
        submit.textContent = "";

        //submit logic

        Clearform();
        setTimeout(()=>{
            Sanitize();
        },1500);
        
    };
    
    
    function Validate(){

        if (!id.value && !password.value){            

            warningtext.textContent = 'Provide your ID and Password';
            warning.style.display = 'flex';
            showNotif();

        }

        if (!id.value && password.value){

            warningtext.textContent = 'Id is required';
            warning.style.display = 'flex';
            showNotif();
        }

        if (!password.value && id.value){

            warningtext.textContent = 'Password is required';
            warning.style.display = 'flex';
            showNotif();
        }
        
        
        if (id.value && password.value){
            Submitform();
        }
    };

    

    

    submit.addEventListener('click', ()=>{
        Validate();

    });
    
    

// Sincerely :) Leevayle@protonmail.com