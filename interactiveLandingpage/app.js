const time = document.getElementById('time');
greeting = document.getElementById('greeting');
let getname = document.getElementById('name');
let getfocus = document.getElementById('focus');

//get time

function showTime() {
    let today = new Date();
    let hour = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();

    //am or pm 
    let amPM = hour >= 12 ? "PM" : "AM";

    hour = hour % 12 || 12;
    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)} ${amPM}`;

    setTimeout(showTime, 1000)

}

//add zeros
function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function changeBg() {
    let today = new Date();
    let hour = today.getHours();

    if (hour < 12) {
        document.body.style.backgroundImage = "url(img/morning.jpg)";
        greeting.textContent = "Good Morning"
    }

    else if (hour < 18) {
        document.body.style.backgroundImage = "url(img/afternoon.jpg)";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundSize = "100%";
        document.body.style.backgroundPosition = "center";
        greeting.textContent = "Good Afternoon"
    }
    else {
        document.body.style.backgroundImage = "url(img/night.jpg)";
        greeting.textContent = "Good Night"
    }
}

//get name 

function getName() {
    if (localStorage.getItem('name') === null) {
        getname.textContent = '[Enter Name]';
    }
    else {
        getname.textContent = localStorage.getItem('name');
    }

}

function setName(e) {

    if(e.type==='keypress') {
//enter pressed

        if(e.which==13 || e.keyCode==13) {
            localStorage.setItem('name',e.target.innerText);
            getname.blur();
        }
    }
    else {
        localStorage.setItem('name',e.target.innerText);
    }

}

function setFocus(e) {

    if(e.type==='keypress') {
//enter pressed

        if(e.which==13 || e.keyCode==13) {
            localStorage.setItem('focus',e.target.innerText);
            getfocus.blur();
        }
    }
    else {
        localStorage.setItem('focus',e.target.innerText);
    }

}

//get focus 

function getFocus() {
    if (localStorage.getItem('focus') === null) {
        getfocus.textContent = '[Enter focus]';
    }
    else {
        getfocus.textContent = localStorage.getItem('focus');
    }

}

getname.addEventListener('keypress', setName);
getname.addEventListener('blur', setName);
getfocus.addEventListener('keypress', setFocus);
getfocus.addEventListener('blur', setFocus);

showTime();
changeBg();
getName();
getFocus();
