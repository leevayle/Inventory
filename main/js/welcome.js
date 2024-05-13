setTimeout(()=>{
    document.getElementById("progress").style.width = "35%";
},1000);

setTimeout(()=>{
    document.getElementById("text").textContent = "Starting...";
},2400);

setTimeout(()=>{
    document.getElementById("progress").style.width = "63%";
},3400);

setTimeout(()=>{
    document.getElementById("progress").style.width = "83%";
},5400);

setTimeout(()=>{
    document.getElementById("text").textContent = "Checking security...";
},6400);

setTimeout(()=>{
    document.getElementById("text").textContent = "Opening...";
},8400);

setTimeout(()=>{
    document.getElementById("progress").style.width = "90%";
},9400);

setTimeout(()=>{
    document.getElementById("progress").style.width = "98%";
},10400);

setTimeout(()=>{
    checkLeenxStatus();
    
},11400);



function checkLeenxStatus() {
    $.ajax({
        url: "./leenx.php", // Change this to the path of your PHP script
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
                
                document.getElementById("loading").style.opacity = "0";
                document.getElementById("main-hidden").style.opacity = "1";
                setTimeout(()=>{
                    window.location.href = "../main/login.html";
                },2400);
            } else {
                // Handle other statuses
                console.log("Unknown status: " + status);
            }
        },
        error: function(xhr, status, error) {
            // Handle error response
            console.error("AJAX request failed: " + status + ", " + error);
        }
    });
}


