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
class achievement {
    constructor(name, cpcr, cpsr, clickreq, description, reward, emoji, achieved) {
        this.name=name
        this.cpcr = cpcr
        this.cpsr = cpsr
        this.clickreq = clickreq
        this.description = description
        this.reward = reward
        this.emoji = emoji
        this.achieved = achieved
    }
    check() {
        if (cpc >= this.cpcr && cps >= this.cpsr && clicks >= this.clickreq && !this.achieved) {
            alert(this.emoji + " Achievement Unlocked: " + this.name + " Reward: " + this.reward)
            this.achieved = true
        }
    }
}


//EDIT THIS:
document.title = "Coding Clicker! (Hiltslash's Engine)"
header.innerHTML = "Write some Code! (with the button)"
const ach1 = new achievement("Click Marathon", 0, 0, 26400, "Get over 26400 clicks.", 6000, "👟")
const ach2 = new achievement("Passive Income", 0, 600, 0, "Make 600 a second.", 6000, "💰")
const ach3 = new achievement("Smash Clicker", 1200, 0, 0, "Get over 26400 clicks.", 6000, "👊")
const up1button = new upgradeButton("Coffee", document.getElementById("up1b"), 4, 0, 10, 1.2, 10)
const up2button = new upgradeButton("Clean-up Code", document.getElementById("up2b"), 6, 0, 60, 1.2, 60)
const up3button = new upgradeButton("AI Code Writer", null, 3, 3, 600, 1.1, 600)
const up4button = new upgradeButton("Hack Computers", null, 100, 450, 3000, 1.001, 3000)
up3button.create()  
up4button.create()
upgrades = [up1button, up2button, up3button, up4button]
achievements = [ach1, ach2, ach3]
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
    localStorage.setItem("cps", cps);
    
    for (let ach of achievements) {
        localStorage.setItem("achievement_" + ach.name, ach.achieved);
    }
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
        
        for (let ach of achievements) {
            ach.achieved = localStorage.getItem("achievement_" + ach.name) === "true";
        }

        theme = localStorage.getItem("theme") || "light";
        clickCount.textContent = clicks;
        statshow.innerHTML = "CPC: " + cpc + " CPS: " + cps;
        
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
    for (let ach of achievements) {
        ach.check()
    }
    save();
});

async function addClicksPerSecond() {
    while (1 == 1) {
        await wait(1000) 
        clicks += cps
        clickCount.textContent = clicks;
        statshow.innerHTML = "CPC: " + cpc + " CPS: " + cps
        save();
    }
    
}

function clearsave() {
    alert("Save DATA reset.");
    
    // Reset upgrades to their starting values
    for (let upgrade of upgrades) {
        upgrade.cost = upgrade.start;
    }
    
    // Reset achievements
    for (let ach of achievements) {
        ach.achieved = false;
        localStorage.removeItem("achievement_" + ach.name);
    }
    
    // Reset game values
    clicks = 0;
    cpc = 1;
    cps = 0;
    theme = "light";
    
    // Reset localStorage
    localStorage.setItem("clicks", clicks);
    localStorage.setItem("cpc", cpc);
    localStorage.setItem("theme", theme);
    localStorage.setItem("cps", cps);
    
    for (let button of upgrades) {
        localStorage.setItem(button.name + "cost", button.start);
    }
    
    // Update UI
    clickCount.textContent = clicks;
    statshow.innerHTML = "CPC: " + cpc + " CPS: " + cps;
    
    // Reset theme to light mode
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
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