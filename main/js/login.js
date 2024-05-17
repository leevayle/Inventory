    
    document.addEventListener('DOMContentLoaded', ()=>{
        const modalcont = document.getElementById("modal-cont");

        // Get the computed style of the modalcont element
        const computedStyle = window.getComputedStyle(modalcont);

        // Check if the computed display property is "none"
        if (computedStyle.display === "none") {
            document.getElementById("id").focus();
        } else {
            document.getElementById("dob").focus();
        }

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
    function ClearId(){
        id.value = "";
    }
    function Blur(){
        id.blur();
        password.blur();
    }

    function Sanitize(){
        const idlength = id.value.length;

        if (idlength>15){

            infotext.textContent = 'Id is too long (max is 15)';
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
                
                if (data.success) {

                    successtext.textContent = data.message;
                    success.style.display = 'flex';
                    showNotif();
                    ClearId();
                    Blur();

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

    // enter submits
    document.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
          event.preventDefault();
         
          const modalcont = document.getElementById('modal-cont');
        //   const mainhidden = document.getElementById('main-hidden');
        //   if(modal.style.display === 'none'){
        //     Validate();
        //   }
        //   if(mainhidden.style.opacity == '0'){
        //     Validate();
        //   }

          const computedStyle = window.getComputedStyle(modalcont);
          if (computedStyle.display === "none") {
            Validate();
        }
        }
      });

      // Preview shortcuts
    document.addEventListener('keydown', function(event) {
        
        if (event.ctrlKey && event.key === '.') {
            
            if (password.type === 'text'){
                password.type = 'password';
        
            }
        }
        if (event.ctrlKey && event.key === ',') {
            
            if (password.type === 'password'){
                password.type = 'text';
                setTimeout(() => {
                    password.type = 'password';  
                }, 2000);
        
            }
        }
    });
    
    

// Sincerely :) Leevayle@protonmail.com