String.prototype.format = function() {
    a = this;
    for (k in arguments) {
        a = a.replace("{" + k + "}", arguments[k])
    }
    return a
}

window.onload = function(){
    var enter = 13;

    window.onkeydown= function(gfg){
        if(gfg.keyCode === enter){
            var searchBox = document.getElementById('search');
            if(document.activeElement === searchBox){
                console.log("Pressed Enter");
                if (searchBox.value.includes(".")) {
                    console.log("Web Page");
                    var site = "https://{0}".format(searchBox.value);
                    console.log(site);
                    window.location.assign(site);
                } else {
                    console.log("Dot not in search");
                    let items = searchBox.value.split(" ");
                    let searchItem = items.join("+");
                    window.location.assign("https://duckduckgo.com/?t=canonical&q={0}&ia=web".format(searchItem));
                }
                searchBox.value = "";
            }
        }
    };
};

// function showTime() {
//     var today = new Date();
//     var h = today.getHours();
//     var m = today.getMinutes();
//     var session = "AM";
//     if(h==0){h=12;}
//     if(h>12){h=h-12;session="PM";}
//     h=double_digits(h);
//     m=double_digits(m);
//     var time = h + ":" + m + " " + session;
//     document.getElementById('txt').innerHTML = time;
//     document.getElementById('txt').innerText = time;
//     document.getElementById('txt').innerContent = time;
//     var t = setTimeout(showTime, 1000);
// }
// function double_digits(n) {
//     return (n<10)?"0"+n:n;
// }
var digitSegments = [
    [1,2,3,4,5,6],
    [2,3],
    [1,2,7,5,4],
    [1,2,7,3,4],
    [6,7,2,3],
    [1,6,7,3,4],
    [1,6,5,4,3,7],
    [1,2,3], 
    [1,2,3,4,5,6,7],
    [1,2,7,3,6]
]

document.addEventListener('DOMContentLoaded', function() {
  var _hours = document.querySelectorAll('.hours');
  var _minutes = document.querySelectorAll('.minutes');
  var _seconds = document.querySelectorAll('.seconds');

  setInterval(function() {
    var date = new Date();
    var hours = date.getHours(), minutes = date.getMinutes(), seconds = date.getSeconds();

    setNumber(_hours[0], Math.floor(hours/10), 1);
    setNumber(_hours[1], hours%10, 1);

    setNumber(_minutes[0], Math.floor(minutes/10), 1);
    setNumber(_minutes[1], minutes%10, 1);

    setNumber(_seconds[0], Math.floor(seconds/10), 1);
    setNumber(_seconds[1], seconds%10, 1);
  }, 1000);
});

var setNumber = function(digit, number, on) {
  var segments = digit.querySelectorAll('.segment');
  var current = parseInt(digit.getAttribute('data-value'));

  // only switch if number has changed or wasn't set
  if (!isNaN(current) && current != number) {
    // unset previous number
    digitSegments[current].forEach(function(digitSegment, index) {
      setTimeout(function() {
        segments[digitSegment-1].classList.remove('on');
      }, index*45)
    });
  }

  if (isNaN(current) || current != number) {
    // set new number after
    setTimeout(function() {
      digitSegments[number].forEach(function(digitSegment, index) {
        setTimeout(function() {
          segments[digitSegment-1].classList.add('on');
        }, index*45)
      });
    }, 250);
    digit.setAttribute('data-value', number);
  }
}
