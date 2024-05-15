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
  
  