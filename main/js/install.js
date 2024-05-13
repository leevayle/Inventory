const progress = document.getElementById("loading");
let text = document.getElementById('info');
const link = document.getElementById('link');
const link2 = document.getElementById('link2');

setTimeout(()=>{
    text.innerHTML = "Standby . ";
},600)
setTimeout(()=>{
    text.innerHTML = "Standby . .";
},1000)
setTimeout(()=>{
    text.innerHTML = "Standby . . .";
},1400)
setTimeout(()=>{
    text.innerHTML = "Starting";
},2000)
setTimeout(()=>{
    text.innerHTML = "Installing";
},4000)
setTimeout(()=>{
    text.innerHTML = "Installing .";
},4500)
setTimeout(()=>{
    text.innerHTML = "Installing . .";
},5000)
setTimeout(()=>{
    text.innerHTML = "Installing . . .";
},5500)
setTimeout(()=>{
    text.innerHTML = "Installing";
},6000)
setTimeout(()=>{
    text.innerHTML = "Installing .";
},6500)
setTimeout(()=>{
    text.innerHTML = "Installing . .";
},7000)


function CreateTables() {
    // Make AJAX call to tables.php script
    $.ajax({
        url: '../main/tables.php', // Adjust the URL to point to the correct location of tables.php
        type: 'POST', // Assuming you want to create tables
        dataType: 'json',
        success: function(response) {
            // Handle successful response
            if (response.success) {
                setTimeout(()=>{
                    progress.style.width = "80%";
                    text.innerHTML = "Tables created successfully";

                    setTimeout(()=>{
                        progress.style.width = "90%";
                        text.innerHTML = "Enforcing security rules";
                    },3000)

                    setTimeout(()=>{
                        progress.style.width = "100%";
                        text.innerHTML = "Done";
                        link.style.display = 'none';
                        link2.style.display = 'block';

                    },5000)

                },2000)
                
            } else {
                setTimeout(()=>{
                    text.innerHTML = "Error creating tables";
                },2000)
            }
        },
        error: function(xhr, status, error) {
            // Handle error
            console.error("AJAX request failed:", status, error);
        }
    });
}



setTimeout(()=>{
    text.innerHTML = "Creating database . . .";

    $(document).ready(function(){
        // Make AJAX call to PHP script
        $.ajax({
            url: '../main/database.php', // Adjust the URL to point to the correct location of database.php
            type: 'POST', // Assuming you want to create the database
            dataType: 'json',
            success: function(response){
                // Handle successful response
                if(response.success){
                    setTimeout(()=>{
                        progress.style.width = "57%";
                        text.innerHTML = "Database created successfully";
                    },1000)

                    setTimeout(()=>{
                        text.innerHTML = "Creating tables";
                        CreateTables();
                    },2500)

                    
                } else {
                    setTimeout(()=>{
                        text.innerHTML = "Database already exists";

                        link2.innerHTML = "Go to login";
                        link.style.display = 'none';
                        link2.style.display = 'block';
                    },700)
                }
            },
            error: function(xhr, status, error){
                // Handle error
                console.error("AJAX request failed:", status, error);
            }
        });
    });
},7500)

// db creation ajax


// setTimeout(()=>{
//     text.innerHTML = "Creating Tables . . .";
// },9500)
// setTimeout(()=>{
//     text.innerHTML = "Making relationships . . .";
// },15000)
// setTimeout(()=>{
//     text.innerHTML = "Establishing security . . .";
// },15900)
// setTimeout(()=>{
//     text.innerHTML = "Finishing . . .";
// },17000)


setTimeout(()=>{
    progress.style.width = "12%";
},2500)
setTimeout(()=>{
    progress.style.width = "47%";
},5000)

// setTimeout(()=>{
//     progress.style.width = "60%";
// },10000)
// setTimeout(()=>{
//     progress.style.width = "80%";
// },13000)
// setTimeout(()=>{
//     progress.style.width = "90%";
// },15000)
// setTimeout(()=>{
//     progress.style.width = "97%";
// },16000)
// setTimeout(()=>{
//     progress.style.width = "100%";
// },17000)


// setTimeout(()=>{
//     link.style.display = 'none';
//     link2.style.display = 'block';
//     text.innerHTML = "Done!";
// },18900)