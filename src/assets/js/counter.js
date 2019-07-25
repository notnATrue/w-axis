let button = document.querySelector('#counter');
let counter = 0;
    button.addEventListener('click', function (event) {
        go();
    });

function go() {
    if (counter < 3) {
        console.log('click');
        counter += 1;
        button.innerHTML = 'Click me' + ' ' +'(' + counter + ')';  
    } else {
        button.removeEventListener('click', function (event) {
            go();
        });
    };
};