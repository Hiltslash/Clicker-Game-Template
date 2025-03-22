const clickCount = document.getElementById("clickCount");
const up1button = document.getElementById("up1b")
const p = document.getElementById("notif")
const header = document.getElementById("h")
const image = document.getElementById("clickImage")
const up2button = document.getElementById("up2b")
var clicks = 0;
var cpc = 1;
var cps = 0;
var up2rq = 60;
var up1rq = 10;
var theme = "light";

function save() {
    localStorage.setItem("clicks", clicks);
    localStorage.setItem("cpc", cpc);
    localStorage.setItem("up2rq", up2rq);
    localStorage.setItem("up1rq", up1rq);
    localStorage.setItem("theme", theme);
}

function load() {
    if (localStorage.getItem("clicks") !== null) {
        clicks = parseInt(localStorage.getItem("clicks")) || 0;
        cpc = parseInt(localStorage.getItem("cpc")) || 1;
        up2rq = parseInt(localStorage.getItem("up2rq")) || 60;
        up1rq = parseInt(localStorage.getItem("up1rq")) || 10;
        theme = localStorage.getItem("theme") || "light";
        // Update UI with loaded values
        clickCount.textContent = count;
        tbutton.innerHTML = "Upgrade 1: Cost:  " + up1rq;
        toyb.innerHTML = "Upgrade 2: Cost:  " + up2rq;
        
        // Apply the saved theme
        if (theme === "dark") {
            document.body.style.backgroundColor = "#191919";
            document.body.style.color = "white";
        }
        
    }
}

//Button click event listner
clickImage.addEventListener("click", () => {
    count += cpc;
    clickCount.textContent = count;
    save();
});

 //Async function delays for milliseconds
function wait(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}



//Treat button function
async function upgrade1() {
    if (count >= up1rq) {
        treatimg()
        cpc += 2;
        p.innerHTML = "+2 CPC";
        count -= up1rq;
        up1rq = Math.ceil(up1rq * 1.2);
        clickCount.textContent = count;
        let message = "Upgrade 1: Cost:  " + up1rq;
        tbutton.innerHTML = message;
        save();
        await wait(2000);
        p.innerHTML = "";
    }
    else {
        p.innerHTML = "Not enough clicks!";
        await wait(2000);
        p.innerHTML = "";
    }
}

//toy button function
async function upgrade2() {
    if (count >= up2rq) {
        toyimg()
        cpc += 6;
        p.innerHTML = "+6 CPC";
        count -= up2rq;
        up2rq = Math.ceil(up2rq * 1.2);
        clickCount.textContent = count;
        let message = "Upgrade 2: Cost:  " + up2rq;
        toyb.innerHTML = message;
        save();
        await wait(2000);
        p.innerHTML = "";
    }
    else {
        p.innerHTML = "Not enough clicks!";
        await wait(2000);
        p.innerHTML = "";
    }
}

//Save deletion function
function clearsave() {
    const confirmReset = window.confirm("Are you sure you want to reset? This cannot be undone.");

    if (confirmReset) {
        localStorage.clear();
        // Reset to default values
        count = 0;
        cpc = 1;
        up2rq = 60;
        up1rq = 10;
        theme = "light";
        currentcat = 1;
        
        // Update UI
        clickCount.textContent = count;
        tbutton.innerHTML = "Upgrade 1: Cost:  " + up1rq;
        toyb.innerHTML = "Upgrade 2: Cost:  " + up2rq;
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
        clickImage.src = "penny.png";
        header.innerHTML = "Click Penny!";
        
        alert("Data has been reset!");
    } else {
        alert("Reset canceled.");
    }
}

//Switches the cat image (penny/pepper)
function switchcat() {
    switch (currentcat) {
        case 1:
            clickImage.src = "pepper.png";
            header.innerHTML = "Click Pepper!";
            currentcat = 2;
            save();
            break;
        case 2:
            clickImage.src = "penny.png";
            header.innerHTML = "Click Penny!";
            currentcat = 1;
            save();
            break;
    }
}

//Toggles light and dark mode
function toggletheme() {
    switch (theme) {
        case "light":
            document.body.style.backgroundColor = "#191919";
            document.body.style.color = "white";
            theme = "dark";
            save();
            break;
        case "dark":
            document.body.style.backgroundColor = "white";
            document.body.style.color = "black";
            theme = "light";
            save();
            break;
    }
}

// Initialize game
load();