    
    document.addEventListener('DOMContentLoaded', ()=>{
        document.getElementById("id").focus();
        document.getElementById("spinner").addEventListener('contextmenu', (e)=>{
            event.preventDefault();
        });
        
        checkLeenxStatus();
    });



    const submit = document.getElementById("submit");
    const spinner = document.getElementById("spinner");
    const id = document.getElementById("id");
    const password = document.getElementById("password");

    function Clearform(){
        setTimeout(()=>{
            // id.value = "";
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
        }else{
            authenticateUser();
        }
    };

    function Submitform(){        

        spinner.style.opacity = "1"; 
        submit.textContent = "";
        

        Clearform();
        setTimeout(()=>{
            Sanitize();
        },1500);
        
    };

    function authenticateUser() {
        var id = document.getElementById('id').value;
        var password = document.getElementById('password').value;
        
        // Display spinner while processing
        //document.getElementById('spinner').style.display = 'flex';
        
        // AJAX request
        $.ajax({
            type: "POST",
            url: "authenticate.php",
            data: {
                id: id,
                password: password
            },
            success: function(response) {

                

                spinner.style.opacity = "0"; 
                submit.textContent = "Submit";
    
                // Parse JSON response
                var data = JSON.parse(response);
    
                // Display appropriate notification based on response
                if (data.success) {

                    // successtext.textContent = 'Login successful';
                    // success.style.display = 'flex';
                    // showNotif();

                    successtext.textContent = data.message;
                    success.style.display = 'flex';
                    showNotif();
                } else {
                    errortext.textContent = data.message;
                    error.style.display = 'flex';
                    showNotif();
                }
            }
        });
    }
    
    
    
    function Validate(){

        if (!id.value && !password.value){            

            warningtext.textContent = 'Provide your ID and Password';
            warning.style.display = 'flex';
            showNotif();
            id.focus();

        }

        if (!id.value && password.value){

            warningtext.textContent = 'Id is required';
            warning.style.display = 'flex';
            showNotif();
            id.focus();
        }

        if (!password.value && id.value){

            warningtext.textContent = 'Password is required';
            warning.style.display = 'flex';
            showNotif();
            password.focus();
        }
        
        
        if (id.value && password.value){
            Submitform();
        }
    };

    

    

    submit.addEventListener('click', ()=>{
        Validate();

    });
    
    

// Sincerely :) Leevayle@protonmail.com