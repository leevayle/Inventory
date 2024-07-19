
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('keydown', function(event) {
        // console.log('Key pressed:', event.key);
        // console.log('Ctrl:', event.ctrlKey);
        // console.log('Shift:', event.shiftKey);

        if (event.ctrlKey && event.shiftKey) {
            switch (event.key) {
                case '!':
                    event.preventDefault();
                    changeStylesheet('./css/themes1.css');
                    break;
                case '@':
                    event.preventDefault();
                    changeStylesheet('./css/themes2.css');
                    break;
                case '#':
                    event.preventDefault();
                    // changeStylesheet('./css/themes3.css');
                    break;
                case '$':
                    event.preventDefault();
                    // changeStylesheet('./css/themes4.css');
                    break;
            }
        }
    });

    function changeStylesheet(cssFile) {
        // console.log('Changing stylesheet to:', cssFile);
        const stylesheet = document.getElementById('style');
        stylesheet.setAttribute('href', cssFile);
    }
});

document.getElementById('collapse').addEventListener('click', function() {
   
    CollapseRestore();

});
document.getElementById('logo-left').addEventListener('click', function() {
   
    CollapseRestore();

});
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.shiftKey) {
      if (event.key === '<') {
        Collapse(); 
      } else if (event.key === '>') {
        Restore(); 
      }
    }
  });

  function Collapse() {
    const nav = document.getElementById('leftnav');
    const currentStyle = getComputedStyle(nav);
    if (currentStyle.display === "none") return;
  
    nav.style.width = '6%';
    document.getElementById('main').style.width = '94%';
    document.querySelectorAll('.nav-name, .nav-item-last').forEach(element => {
      element.style.display = 'none';
      // element.style.float = 'left'; // Assuming you want left-aligned text
    });
    document.querySelectorAll('.nav-icon').forEach(element => {
      element.style.margin = 'auto';
      element.style.minWidth = '25px';
      element.style.maxHeight = '25px';
    });
    document.querySelectorAll('.nav-item').forEach(element => {
      element.style.width = '40%';
      element.style.minWidth = '40px';
      element.style.paddingRight = '0px';
      element.style.display = 'flex';
    });
  }
  
  function Restore() {
    const nav = document.getElementById('leftnav');
    const currentStyle = getComputedStyle(nav);
    if (currentStyle.display === "none") return;
  
    nav.style.width = '14%';
    document.getElementById('main').style.width = '86%';
    document.querySelectorAll('.nav-name, .nav-item-last').forEach(element => {
      element.style.display = 'block';
      element.style.marginLeft = '7px';
      element.style.float = 'left';
    });
    document.querySelectorAll('.nav-icon').forEach(element => {
      element.style.minWidth = '25px';
      element.style.maxHeight = '25px';
      element.style.marginLeft = '10px';
    });
    document.querySelectorAll('.nav-item').forEach(element => {
      element.style.width = '90%';
      element.style.paddingRight = '2px';
      element.style.display = 'flex';
    });
  }
  
  function CollapseRestore() {
    const isCollapsed = document.getElementById('leftnav').style.width === '6%';
    if (isCollapsed) {
      Restore();
    } else {
      Collapse();
    }
  }
  

function ShowLogout(){
    
    const btn = document.getElementById('logoutmenu');

    const currentStyle = getComputedStyle(btn);
    const isHidden = currentStyle.display === 'none';
    
    if (isHidden) {
      btn.style.display = 'block';
    } else {
      btn.style.display = 'none';
    }   
    
}

document.addEventListener("DOMContentLoaded",()=>{
    const btn = document.getElementById('expand-profile');
    btn.addEventListener('click',ShowLogout);   
});

function ShowNotification(){
    
    const n = document.getElementById('notification-expand');

    const currentStyle = getComputedStyle(n);
    const isHidden = currentStyle.display === 'none';
    
    if (isHidden) {
      n.style.display = 'block';
    } else {
      n.style.display = 'none';
    }   
    
}
document.addEventListener("DOMContentLoaded",()=>{
    const btnn = document.getElementById('expand-notification');
    btnn.addEventListener('click',ShowNotification);   
});