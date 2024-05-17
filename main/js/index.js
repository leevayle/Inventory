setTimeout(()=>{
    document.getElementById("fade-in").style.opacity = "1";

},2000);
setTimeout(()=>{
    
    checkDatabaseExists();
    fetchLeenxDetails();

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

function fetchLeenxDetails() {
    // AJAX request to fetch Leenx data
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Parse JSON response
                var responseData = JSON.parse(xhr.responseText);
                if (responseData.success) {
                    // Extract data from response
                    var version = btoa(responseData.data.version);
                    var url = btoa(responseData.data.url);
                    var slogan = btoa(responseData.data.slogan);
                    var name = btoa(responseData.data.name);
                    
                    
                    
                    // Store data in LocalStorage
                    localStorage.setItem("leenx_version", version);
                    localStorage.setItem("leenx_url", url);
                    localStorage.setItem("leenx_slogan", slogan);
                    localStorage.setItem("leenx_name", name);
                } else {
                    console.error("Error: " + responseData.message);
                }
            } else {
                console.error("Error: AJAX request failed");
            }
        }
    };
    xhr.open("GET", "main/leenx_details.php", true);
    xhr.send();
}