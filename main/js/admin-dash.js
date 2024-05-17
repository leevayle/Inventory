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
