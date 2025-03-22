const clickCount = document.getElementById("clickCount");
const p = document.getElementById("notif")
const header = document.getElementById("h")
const image = document.getElementById("clickImage")
const statshow = document.getElementById("stats")

class upgradeButton {
    constructor(name, element, cpc, cps, cost, multiplier, start) {
        this.name = name
        this.element = element
        this.cpc = cpc
        this.cps = cps
        this.cost = cost
        this.multiplier = multiplier
        this.start = start
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
document.title = "Coding Clicker! (Hiltslash's Engine)"
header.innerHTML = "Write some Code! (with the button)"

const up1button = new upgradeButton("Coffee", document.getElementById("up1b"), 4, 0, 10, 1.2, 10)
const up2button = new upgradeButton("Clean-up Code", document.getElementById("up2b"), 6, 0, 60, 1.2, 60)
const up3button = new upgradeButton("AI Code Writer", null, 3, 3, 600, 1.1)
const up4button = new upgradeButton("Hack Computers", null, 100, 450, 3000, 1.001, 3000)
up3button.create()  
up4button.create()
upgrades = [up1button, up2button, up3button, up4button]
//Create new upgrades with the upgradeButton class. (name, element, cpc, cps, multiplier)
//For custom upgrades, run the <name>.create() function to initialize. up3button is an example.


var clicks = 0;
var cpc = 1;
var cps = 0;
var theme = "light";

function save() {
    for (let button of upgrades) {
        localStorage.setItem(button.name + "cost", button.cost);
    }
    localStorage.setItem("clicks", clicks);
    localStorage.setItem("cpc", cpc);
    localStorage.setItem("theme", theme);
    localStorage.setItem("cps", cps)
}

function load() {
    if (localStorage.getItem("clicks") !== null) {
        clicks = parseInt(localStorage.getItem("clicks")) || 0;
        cpc = parseInt(localStorage.getItem("cpc")) || 1;
        cps = parseInt(localStorage.getItem("cps")) || 0;
        for (let button of upgrades) {
            let storedCost = localStorage.getItem(button.name + "cost");
            button.cost = storedCost ? parseInt(storedCost) : button.cost;
        }
        
        
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
    for (let upgrade of upgrades) {
        upgrade.cost = upgrade.start;  // Use the original starting cost
    }
    
    localStorage.setItem("clicks", 0);
    localStorage.setItem("cpc", 1);
    localStorage.setItem("theme", "light");
    localStorage.setItem("cps", 0)
    clicks = 0
    cpc = 1
    cps = 0
    up1button.cost = 10
    up2button.cost = 60
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