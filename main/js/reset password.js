    
    document.addEventListener('DOMContentLoaded', ()=>{
        
        document.getElementById("r-spinner").addEventListener('contextmenu', (e)=>{
            event.preventDefault();
        });
        
    });



    const rsubmit = document.getElementById("r-submit");
    const rspinner = document.getElementById("r-spinner");
    const rid = document.getElementById("r-id");
    const dob = document.getElementById("dob");
    const rpassword =  document.getElementById("r-password");

    function Clearformr(){
        setTimeout(()=>{
            rid.value = "";
            rpassword.value = "";
        },1550);
        
    };
    function ClearIdr(){
        rid.value = "";
    }
    function Blurr(){
        rid.blur();
        rpassword.blur();
    }

    function Sanitizer(){
        const ridlength = rid.value.length;
        const doblength = dob.value.length;
        const passwordlength = rpassword.value.length;

        
        if (doblength > 2){
            
            infotext.textContent = 'Day of birth should be 1 or two digits';
            info.style.display = 'flex';
            showNotif();

            document.getElementById("dob").focus();
            rspinner.style.opacity = "0"; 
            rsubmit.textContent = "Reset";

        }
        if ( ridlength >= 15){
            
            infotext.textContent = 'Id should not exeed 15 characters';
            info.style.display = 'flex';
            showNotif();

            document.getElementById("r-id").focus();
            rspinner.style.opacity = "0"; 
            rsubmit.textContent = "Reset";

        }
        if (passwordlength < 8 ){
            
            infotext.textContent = 'Password must be 8 characters or more';
            info.style.display = 'flex';
            showNotif();

            document.getElementById("r-password").focus();
            rspinner.style.opacity = "0"; 
            rsubmit.textContent = "Reset";

        }
        if (passwordlength >= 8 && doblength <= 2 && ridlength <= 15){

            authenticateUserr();

        }
    };

    function Submitformr(){        

        rspinner.style.opacity = "1"; 
        rsubmit.textContent = "";
        

        Clearform();
        setTimeout(()=>{
            Sanitizer();
        },1500);
        
    };

    function authenticateUserr() {
        var id = document.getElementById('r-id').value;
        var password = document.getElementById('r-password').value;
        var dob = document.getElementById('dob').value;
        
        // Display spinner while processing
        //document.getElementById('spinner').style.display = 'flex';
        
        // AJAX request
        $.ajax({
            type: "POST",
            url: "reset.php",
            data: {
                id: id,
                password: password,
                dob: dob
            },
            success: function(data) {
               
                data = JSON.parse(data);
        
                
                if (data.success) {
                    successtext.textContent = data.message;
                    success.style.display = 'flex';
                    showNotif();
                    
                    rspinner.style.opacity = "0"; 
                    rsubmit.textContent = "Reset";

                    setTimeout(() => {
                        
                        closeModal();

                    }, 3500);



                } else {
                    // Display error message
                    errortext.textContent = data.message;
                    error.style.display = 'flex';
                    showNotif();

                    rspinner.style.opacity = "0"; 
                    rsubmit.textContent = "Reset";

                    setTimeout(() => {
                        
                        closeModal();

                    }, 3500);
                }
            },
            error: function(xhr, status, error) {
                // Display error message if AJAX request failed
                error.textContent = "Error: " + error;
                error.style.display = 'flex';
                showNotif();

                setTimeout(() => {
                        
                    closeModal();

                }, 3500);
            }
        });
        
    }
    
    
    
    function Validater(){

        if (!rid.value && !rpassword.value && !dob.value){            

            warningtext.textContent = 'Kindly provide your details';
            warning.style.display = 'flex';
            showNotif();
            dob.focus();

        }

        if (rid.value && rpassword.value && !dob.value){

            warningtext.textContent = 'Your day of birth is required';
            warning.style.display = 'flex';
            showNotif();
            dob.focus();
        }

        if (!rid.value && rpassword.value && dob.value){

            warningtext.textContent = 'Your Id is required';
            warning.style.display = 'flex';
            showNotif();
            rid.focus();
        }

        if (!rpassword.value && rid.value && dob.value){

            warningtext.textContent = 'New Password is required';
            warning.style.display = 'flex';
            showNotif();
            rpassword.focus();
        }
        if (!rpassword.value && !rid.value && dob.value){

            warningtext.textContent = 'Kindly fill all fields';
            warning.style.display = 'flex';
            showNotif();
            rid.focus();
        }
        if (rpassword.value && !rid.value && !dob.value){

            warningtext.textContent = 'Kindly fill all fields';
            warning.style.display = 'flex';
            showNotif();
            dob.focus();
        }
        if (!rpassword.value && rid.value && !dob.value){

            warningtext.textContent = 'Kindly fill all fields';
            warning.style.display = 'flex';
            showNotif();
            dob.focus();
        }
        
        
        if (rid.value && rpassword.value && dob.value){
            Submitformr();
        }
    };

    

    

    rsubmit.addEventListener('click', ()=>{
        Validater();

    });

      // Preview shortcuts
    document.addEventListener('keydown', function(event) {
        
        if (event.ctrlKey && event.key === '.') {
            
            if (rpassword.type === 'text'){
                rpassword.type = 'password';
        
            }
        }
        if (event.ctrlKey && event.key === ',') {
            
            if (rpassword.type === 'password'){
                rpassword.type = 'text';
                setTimeout(() => {
                    rpassword.type = 'password';  
                }, 2000);
        
            }
        }
    });
    
    

// Sincerely :) Leevayle@protonmail.com