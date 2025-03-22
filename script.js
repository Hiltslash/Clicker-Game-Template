const clickCount = document.getElementById("clickCount");
const p = document.getElementById("notif")
const header = document.getElementById("h")
const image = document.getElementById("clickImage")
const statshow = document.getElementById("stats")

class upgradeButton {
    constructor(name, element, cpc, cps, cost, multiplier) {
        this.name = name
        this.element = element
        this.cpc = cpc
        this.cps = cps
        this.cost = cost
        this.multiplier = multiplier
    }
    async clicked() {
        if (clicks >= this.cost) {
            cpc += this.cpc;
            p.innerHTML = "+6 CPC";
            clicks -= this.cost;
            this.cost = Math.ceil(this.cost * this.multiplier);
            clickCount.textContent = clicks;
            let message =  this.name+": Cost:  " + this.cost;
            this.element.innerHTML = message;
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
}



//EDIT THIS:
document.title = "GAME TITLE"
header.innerHTML = "Click the button!"
const up1button = new upgradeButton("Upgrade 1", document.getElementById("up1b"), 4, 0, 10, 1.2)
const up2button = new upgradeButton("Upgrade 2", document.getElementById("up2b"), 6, 0, 60, 1.2)
//Create new upgrades with the upgradeButton class. (name, element, cpc, cps, multiplier)












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
        up2button.cost = parseInt(localStorage.getItem("up2rq")) || 60;
        up1button.cost = parseInt(localStorage.getItem("up1rq")) || 10;
        theme = localStorage.getItem("theme") || "light";
        // Update UI with loaded values
        clickCount.textContent = clicks;

        statshow.innerHTML = "CPC: " + cpc + " CPS: " +cps
        
        // Apply the saved theme
        if (theme === "dark") {
            document.body.style.backgroundColor = "#191919";
            document.body.style.color = "white";
        }
        
    }
}

//Button click event listner
clickImage.addEventListener("click", () => {
    clicks += cpc;
    clickCount.textContent = clicks;
    statshow.innerHTML = "CPC: " + cpc + " CPS: " +cps
    save();
});

 //Async function delays for milliseconds
function wait(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}



//Treat button function
async function upgrade1() {
    if (clicks >= up1rq) {
        cpc += 2;
        p.innerHTML = "+2 CPC";
        clicks -= up1rq;
        up1rq = Math.ceil(up1rq * 1.2);
        clickCount.textContent = clicks;
        let message = "Upgrade 1: Cost:  " + up1rq;
        up1button.innerHTML = message;
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
        clicks = 0;
        cpc = 1;
        up2rq = 60;
        up1rq = 10;
        theme = "light";
        currentcat = 1;
        
        // Update UI
        clickCount.textContent = clicks;
        up1button.innerHTML = "Upgrade 1: Cost:  " + up1rq;
        up2button.innerHTML = "Upgrade 2: Cost:  " + up2rq;
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