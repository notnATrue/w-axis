var foo =  {
    delay: function(time) {
        let timer = null;
        timer = setInterval(function() {
            alert("bingo!");
            clearInterval(timer);
            timer = null;
        }, time)
    }
};

var bar =  {
    delay: function(time) {
        let timer = null;
        timer = setInterval(function() {
            alert("Wow!");
            clearInterval(timer);
            timer = null;
        }, time)
    }
};

// foo.delay(300);  после 0.3s: "bingo!"
// bar.delay(600);  после 0.6s: "Wow!"
