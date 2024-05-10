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
    document.getElementById("loading").style.opacity = "0";
    document.getElementById("main-hidden").style.opacity = "1";
},11400);

setTimeout(()=>{
    location.href = "login.html";
},16400);