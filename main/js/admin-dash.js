
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

function Collapse(){
    document.getElementById('leftnav').style.width = '6%';
    document.getElementById('main').style.width = '94%';
}

function Restore(){
    document.getElementById('leftnav').style.width = '14%';
    document.getElementById('main').style.width = '86%';
}

function CollapseRestore(){
    var widthstatus = document.getElementById('leftnav').style.width;

   if (widthstatus === '14%' || widthstatus === 'auto' || widthstatus === '') {
    Collapse();
  } else {
    Restore();
  }
}