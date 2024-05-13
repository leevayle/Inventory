setTimeout(()=>{
    document.getElementById("fade-in").style.opacity = "1";

},2000);
setTimeout(()=>{
    
    checkDatabaseExists();

},7000);

function checkDatabaseExists() {
    $.ajax({
        url: "main/init.php", // Change this to the path of your PHP script
        type: "GET",
        dataType: "json",
        success: function(response) {
            // Handle successful response
            if (response.success) {
                // Database exists
                location.href = "main/welcome.html";
                console.log("Database exists");
            } else {
                // Database does not exist
                console.log("Database does not exist");
                location.href = "install/install.html";
            }
        },
        error: function(xhr, status, error) {
            // Handle error response
            console.error("AJAX request failed: " + status + ", " + error);
        }
    });
}



