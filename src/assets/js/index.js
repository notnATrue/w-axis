let getCourse = document.querySelector('#course');
    getCourse.addEventListener('click', function(event) {
        myFetch('course');
    });

function myFetch(url) {
    return fetch('/' + url)
           .then(data => data.json())
           .then(res => console.log(res))
           .catch(err => console.log(err));
};