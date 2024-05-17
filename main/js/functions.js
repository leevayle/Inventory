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

function showModal() {
    const modal = document.getElementById("modal");
    const modalcont = document.getElementById("modal-cont");
    const mainform = document.getElementById("main-form");

    mainform.style.opacity = "0";
    modal.style["z-index"] = "3";
    modalcont.style.display = "inline";
    
  }
  
  function closeModal() {
    const modal = document.getElementById("modal");
    const modalcont = document.getElementById("modal-cont");
    const mainform = document.getElementById("main-form");

    
    modal.style["z-index"] = "-1";
    modalcont.style.display = "none";
    mainform.style.opacity = "1";

    document.getElementById("r-id").value = "";
    document.getElementById("r-password").value = "";
    document.getElementById("dob").value = "";
  }

  function RedirectUsers(){
    window.location = "./admin-dash.html";
  }
  