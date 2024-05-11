    document.addEventListener('DOMContentLoaded', ()=>{
        document.getElementById("id").focus();

        
    });



    const submit = document.getElementById("submit");
    const spinner = document.getElementById("spinner");
    const id = document.getElementById("id");
    
    function Submitform(){
        spinner.style.opacity = "1"; 
        submit.textContent = "";
    };

    submit.addEventListener('click', ()=>{
          Submitform();

    });
    
    

// Sincerely :) Leevayle@protonmail.com