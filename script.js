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
            cps += this.cps;
            let pmessage = "+" + this.cpc + " cpc, +" + this.cps + " cps"
            p.innerHTML = pmessage
            clicks -= this.cost;
            this.cost = Math.ceil(this.cost * this.multiplier);
            clickCount.textContent = clicks;
            let message =  this.name+": Cost:  " + this.cost;
            this.element.innerHTML = message;
            save();
            await wait(2000);
            p.innerHTML = "";
            statshow.innerHTML = "CPC: " + cpc + " CPS: " +cps
        }
        else {
            p.innerHTML = "Not enough clicks!";
            await wait(2000);
            p.innerHTML = "";
        }
    }
    async create() {
        if (this.element == null) {
            const nelement = document.createElement("button")
            let message =  this.name+": Cost:  " + this.cost;
            nelement.id = this.name
            nelement.innerHTML = message
            console.log("he")
            nelement.onclick = () => this.clicked();
            document.body.insertBefore(nelement, p)
            this.element = nelement

        }
        else {
            console.log("No need to create new element, (element is not null)")
        }
    }
}



//EDIT THIS:
document.title = "GAME TITLE"
header.innerHTML = "Click the button!"
const up1button = new upgradeButton("Upgrade 1", document.getElementById("up1b"), 4, 0, 10, 1.2)
const up2button = new upgradeButton("Upgrade 2", document.getElementById("up2b"), 6, 0, 60, 1.2)
const up3button = new upgradeButton("Upgrade 3", null, 3, 3, 600, 1.1)
up3button.create()

//Create new upgrades with the upgradeButton class. (name, element, cpc, cps, multiplier)
//For custom upgrades, run the <name>.create() function to initialize. up3button is an example.


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
    localStorage.setItem("cps", cps)
}

function load() {
    if (localStorage.getItem("clicks") !== null) {
        clicks = parseInt(localStorage.getItem("clicks")) || 0;
        cpc = parseInt(localStorage.getItem("cpc")) || 1;
        cps = parseInt(localStorage.getItem("cps")) || 0;
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

async function addClicksPerSecond() {
    while (1 == 1) {
        await wait(1000) 
        clicks += cps
        clickCount.textContent = clicks;
        statshow.innerHTML = "CPC: " + cpc + " CPS: " +cps
        save();
    }
    
}

function clearsave() {
    alert("Save DATA reset.")
    localStorage.clear()
}
 //Async function delays for milliseconds
function wait(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
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
addClicksPerSecond();