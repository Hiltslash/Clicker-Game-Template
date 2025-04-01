const clickCount = document.getElementById("clickCount");
const p = document.getElementById("notif")
const header = document.getElementById("h")
const image = document.getElementById("clickImage")
const statshow = document.getElementById("stats")
const achnoise = new Audio("ach.mp3")
const hehe = document.getElementById("hehe")
hehe.style.display = "none"
class devtools {
    constructor() {}
    forcePrestige(button) {
        if (button != "all") {
            let upgrade = upgrades[button];
            if (!upgrade) {
                console.error("Invalid upgrade index:", button);
                return;
            }
            
            // Don't allow prestiging beyond level 5
            if (upgrade.prestige >= 5) {
                console.log(upgrade.name + " is already at max prestige level");
                upgrade.completed = true;
                
                // Remove both upgrade button and prestige button if they exist
                if (upgrade.prestigeButton && upgrade.prestigeButton.parentNode) {
                    upgrade.prestigeButton.parentNode.removeChild(upgrade.prestigeButton);
                }
                if (upgrade.element && upgrade.element.parentNode) {
                    upgrade.element.parentNode.removeChild(upgrade.element);
                }
                console.log("Removed upgrade and prestige buttons for " + upgrade.name);
                
                save();
                return;
            }
            
            upgrade.prestige++;
            
            // Apply visual changes
            if (upgrade.element) {
                switch (upgrade.prestige) {
                    case 1:
                        upgrade.element.style.backgroundColor = "lightcoral";
                        break;
                    case 2:
                        upgrade.element.style.backgroundColor = "aquamarine";
                        break;
                    case 3:
                        upgrade.element.style.backgroundColor = "gold";
                        break;
                    case 4:
                        upgrade.element.style.backgroundColor = "violet";
                        break;
                    case 5:
                        upgrade.element.style.backgroundColor = "crimson";
                        upgrade.element.style.color = "white";
                        upgrade.completed = true;
                        
                        // Remove both upgrade button and prestige button when reaching max level
                        if (upgrade.prestigeButton && upgrade.prestigeButton.parentNode) {
                            upgrade.prestigeButton.parentNode.removeChild(upgrade.prestigeButton);
                        }
                        if (upgrade.element.parentNode) {
                            upgrade.element.parentNode.removeChild(upgrade.element);
                        }
                        console.log("Removed upgrade and prestige buttons for " + upgrade.name);
                        break;
                    default:
                        // Should not reach here, but just in case
                        upgrade.prestige = 5;
                        upgrade.element.style.backgroundColor = "crimson";
                        upgrade.element.style.color = "white";
                        upgrade.completed = true;
                        
                        // Remove both upgrade button and prestige button when reaching max level
                        if (upgrade.prestigeButton && upgrade.prestigeButton.parentNode) {
                            upgrade.prestigeButton.parentNode.removeChild(upgrade.prestigeButton);
                        }
                        if (upgrade.element.parentNode) {
                            upgrade.element.parentNode.removeChild(upgrade.element);
                        }
                        console.log("Removed upgrade and prestige buttons for " + upgrade.name);
                        break;
                }
            }
            
            // Apply stat boosts
            upgrade.clickPrestigeRequirement *= 4000;
            upgrade.cpcPrestigeRequirement *= 4000;
            upgrade.cpsPrestigeRequirement *= 4000;
            upgrade.cpc = Math.ceil(upgrade.cpc * upgrade.prestigeMultiplier);
            upgrade.cps = Math.ceil(upgrade.cps * upgrade.prestigeMultiplier);
            upgrade.prestigeMultiplier += 1200;
            
            // Don't call checkPrestigeAvailability if completed, as it will try to recreate button
            if (!upgrade.completed) {
                upgrade.checkPrestigeAvailability();
            }
            
            save();
        }
        else {
            for (let upgrade of upgrades) {
                if (!upgrade) continue;
                
                // Don't allow prestiging beyond level 5
                if (upgrade.prestige >= 5) {
                    upgrade.completed = true;
                    
                    // Remove both upgrade button and prestige button if they exist
                    if (upgrade.prestigeButton && upgrade.prestigeButton.parentNode) {
                        upgrade.prestigeButton.parentNode.removeChild(upgrade.prestigeButton);
                    }
                    if (upgrade.element && upgrade.element.parentNode) {
                        upgrade.element.parentNode.removeChild(upgrade.element);
                    }
                    console.log("Removed upgrade and prestige buttons for " + upgrade.name);
                    
                    continue;
                }
                
                upgrade.prestige++;
                
                // Apply visual changes
                if (upgrade.element) {
                    switch (upgrade.prestige) {
                        case 1:
                            upgrade.element.style.backgroundColor = "lightcoral";
                            break;
                        case 2:
                            upgrade.element.style.backgroundColor = "aquamarine";
                            break;
                        case 3:
                            upgrade.element.style.backgroundColor = "gold";
                            break;
                        case 4:
                            upgrade.element.style.backgroundColor = "violet";
                            break;
                        case 5:
                            upgrade.element.style.backgroundColor = "crimson";
                            upgrade.element.style.color = "white";
                            upgrade.completed = true;
                            
                            // Remove both upgrade button and prestige button when reaching max level
                            if (upgrade.prestigeButton && upgrade.prestigeButton.parentNode) {
                                upgrade.prestigeButton.parentNode.removeChild(upgrade.prestigeButton);
                            }
                            if (upgrade.element.parentNode) {
                                upgrade.element.parentNode.removeChild(upgrade.element);
                            }
                            console.log("Removed upgrade and prestige buttons for " + upgrade.name);
                            break;
                        default:
                            // Should not reach here, but just in case
                            upgrade.prestige = 5;
                            upgrade.element.style.backgroundColor = "crimson";
                            upgrade.element.style.color = "white";
                            upgrade.completed = true;
                            
                            // Remove both upgrade button and prestige button when reaching max level
                            if (upgrade.prestigeButton && upgrade.prestigeButton.parentNode) {
                                upgrade.prestigeButton.parentNode.removeChild(upgrade.prestigeButton);
                            }
                            if (upgrade.element.parentNode) {
                                upgrade.element.parentNode.removeChild(upgrade.element);
                            }
                            console.log("Removed upgrade and prestige buttons for " + upgrade.name);
                            break;
                    }
                }
                
                // Apply stat boosts
                upgrade.clickPrestigeRequirement *= 4000;
                upgrade.cpcPrestigeRequirement *= 4000;
                upgrade.cpsPrestigeRequirement *= 4000;
                upgrade.cpc = Math.ceil(upgrade.cpc * upgrade.prestigeMultiplier);
                upgrade.cps = Math.ceil(upgrade.cps * upgrade.prestigeMultiplier);
                upgrade.prestigeMultiplier += 1200;
                
                // Don't call checkPrestigeAvailability if completed, as it will try to recreate button
                if (!upgrade.completed) {
                    upgrade.checkPrestigeAvailability();
                }
            }
            save();
        }
    }
    setclicks(amount) {
        clicks = amount
        clickCount.textContent = clicks
    }
    setcpc(amount) {
        cpc = amount
        statshow.innerHTML = "CPC: " + cpc + " CPS: " + cps
    }
    setcps(amount) {
        cps = amount
        statshow.innerHTML = "CPC: " + cpc + " CPS: " + cps
    }
    settheme(theme) {
        theme = theme
        save()
    }
    setachievement(achievement) {
        achievements[achievement].achieved = true
        achnoise.play()
    }
    setupgrade(upgrade, cost) {
        upgrades[upgrade].cost = cost
        upgrades[upgrade].checkPrestigeAvailability()
    }
    meme() {
        hehe.style.display = "block"
        hehe.style.position = "fixed"
        hehe.style.top = "50"
        hehe.style.left = "50%"
        hehe.style.transform = "translate(-50%, -50%)"
        hehe.style.zIndex = "1000"
        hehe.style.width = "100px"
        hehe.style.height = "100px"
    }
}
class upgradeButton {
    constructor(name, element, cpc, cps, cost, multiplier) {
        this.name = name
        this.element = element
        this.cpc = cpc
        this.cps = cps
        this.cost = cost
        this.multiplier = multiplier
        this.start = cost
        this.prestige = 0
        this.cpcPrestigeMultiplier = this.cpc ** 2
        this.cpsPrestigeMultiplier = this.cps ** 2
        this.cpcPrestigeRequirement = this.cpc * 4000
        this.cpsPrestigeRequirement = this.cps * 4000
        this.clickPrestigeRequirement = this.cost * 4000
        this.timesclicked = 0
        this.prestigeMultiplier = 1000
        this.prestigeButton = null
        this.completed = false
    }
    async clicked() {
        if (clicks >= this.cost) {
            cpc += this.cpc;
            this.timesclicked ++
            cps += this.cps;
            let pmessage = "+" + this.cpc + " cpc, +" + this.cps + " cps"
            p.innerHTML = pmessage
            clicks -= this.cost;
            this.cost = Math.ceil(this.cost * this.multiplier);
            clickCount.textContent = clicks;
            let message =  this.name+": Cost:  " + this.cost;
            this.element.innerHTML = message;
            this.checkPrestigeAvailability();
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
            nelement.onclick = () => this.clicked();
            
            const mainContent = document.querySelector(".main-content");
            if (mainContent && p) {
                mainContent.insertBefore(nelement, p);
                this.element = nelement;
            } else {
                console.error("Could not find .main-content or notification element");
                // Fallback to body if main-content is not found
                if (document.body) {
                    document.body.appendChild(nelement);
                    this.element = nelement;
                }
            }
        }
        else {
            console.log("No need to create new element, (element is not null)")
        }

        // Create prestige button
        this.prestigeButton = document.createElement("button");
        this.prestigeButton.className = "prestige-button";
        this.prestigeButton.innerHTML = `Prestige ${this.name}`;
        this.prestigeButton.onclick = () => this.nprestige();
        
        const sidebarButtons = document.querySelector(".sidebar-buttons");
        if (sidebarButtons) {
            sidebarButtons.appendChild(this.prestigeButton);
        } else {
            console.error("Could not find .sidebar-buttons element");
            // Create the sidebar buttons container if it doesn't exist
            const sidebar = document.querySelector(".sidebar");
            if (sidebar) {
                const newSidebarButtons = document.createElement("div");
                newSidebarButtons.className = "sidebar-buttons";
                sidebar.appendChild(newSidebarButtons);
                newSidebarButtons.appendChild(this.prestigeButton);
            } else if (document.body) {
                // Last resort, append to body
                document.body.appendChild(this.prestigeButton);
            }
        }
        
        this.checkPrestigeAvailability();
    }
    checkPrestigeAvailability() {
        if (this.prestigeButton) {
            // First set completed state if prestige level is 5 or higher
            if (this.prestige >= 5) {
                this.completed = true;
            }
            
            // Handle display of the button
            if (this.completed) {
                // Remove the button from the DOM entirely if completed
                if (this.prestigeButton.parentNode) {
                    this.prestigeButton.parentNode.removeChild(this.prestigeButton);
                }
            } else {
                // Otherwise handle normal visibility
                this.prestigeButton.classList.remove("completed");
                this.prestigeButton.style.display = "";
                const canPrestige = clicks >= this.clickPrestigeRequirement && 
                                 cpc >= this.cpcPrestigeRequirement && 
                                 cps >= this.cpsPrestigeRequirement;
                this.prestigeButton.classList.toggle("available", canPrestige);
            }
        }
    }
    nprestige() {
        if (clicks >= this.clickPrestigeRequirement && cpc >= this.cpcPrestigeRequirement && cps >= this.cpsPrestigeRequirement) {
            this.prestige++;
            
            if (this.element) {
                switch (this.prestige) {
                    case 1:
                        this.element.style.backgroundColor = "lightcoral";
                        break;
                    case 2:
                        this.element.style.backgroundColor = "aquamarine";
                        break;
                    case 3:
                        this.element.style.backgroundColor = "gold";
                        break;
                    case 4:
                        this.element.style.backgroundColor = "violet";
                        break;
                    case 5:
                        this.element.style.backgroundColor = "crimson";
                        this.element.style.color = "white";
                        this.completed = true;
                        
                        // Remove both the upgrade button and prestige button when reaching max level
                        if (this.prestigeButton && this.prestigeButton.parentNode) {
                            this.prestigeButton.parentNode.removeChild(this.prestigeButton);
                        }
                        if (this.element.parentNode) {
                            this.element.parentNode.removeChild(this.element);
                        }
                        console.log("Removed upgrade and prestige buttons for " + this.name);
                        break;
                    default:
                        // Should not reach here, but just in case
                        this.element.style.backgroundColor = "crimson";
                        this.element.style.color = "white";
                        this.completed = true;
                        
                        // Remove both the upgrade button and prestige button for any level above 5
                        if (this.prestigeButton && this.prestigeButton.parentNode) {
                            this.prestigeButton.parentNode.removeChild(this.prestigeButton);
                        }
                        if (this.element.parentNode) {
                            this.element.parentNode.removeChild(this.element);
                        }
                        console.log("Removed upgrade and prestige buttons for " + this.name);
                        break;
                }
            }
            
            this.clickPrestigeRequirement *= 4000;
            this.cpcPrestigeRequirement *= 4000;
            this.cpsPrestigeRequirement *= 4000;
            this.cpc = Math.ceil(this.cpc * this.prestigeMultiplier);
            this.cps = Math.ceil(this.cps * this.prestigeMultiplier);
            this.prestigeMultiplier += 1200;
            
            // Only call checkPrestigeAvailability if not completed
            if (!this.completed) {
                this.checkPrestigeAvailability();
            }
            
            save();
        }
    }
}
class achievement {
    constructor(name, cpcr, cpsr, clickreq, description, reward, emoji) {
        this.name=name
        this.cpcr = cpcr
        this.cpsr = cpsr
        this.clickreq = clickreq
        this.description = description
        this.reward = reward
        this.emoji = emoji
        this.achieved = false
    }
    check() {
            if (cpc >= this.cpcr && cps >= this.cpsr && clicks >= this.clickreq && !this.achieved) {
            alert(this.emoji + " Achievement Unlocked: " + this.name + " Reward: " + this.reward)
            this.achieved = true
            achnoise.play()
        }
    }
}

achievements = []
upgrades = []
//EDIT THIS:
document.title = "Coding Clicker! (Hiltslash's Engine)"
header.innerHTML = "Write some Code! (with the button)"
const up1button = new upgradeButton('True Rizz', null, 100, 100, 600, 1);
upgrades.push(up1button)
up1button.create()

const up0button = new upgradeButton('Coffee', null, 2, 1, 10, 1);
upgrades.push(up0button)
up0button.create()





//Create new upgrades with the upgradeButton class. (name, element, cpc, cps, multiplier)
//For custom upgrades, run the <name>.create() function to initialize. up3button is an example.


var clicks = 0;
var cpc = 1;
var cps = 0;
var theme = "light";

function save() {
    try {
        for (let button of upgrades) {
            localStorage.setItem(button.name + "cost", button.cost.toString());
            localStorage.setItem(button.name + "prestige", button.prestige.toString());
            localStorage.setItem(button.name + "cpc", button.cpc.toString());
            localStorage.setItem(button.name + "cps", button.cps.toString());
            localStorage.setItem(button.name + "clickReq", button.clickPrestigeRequirement.toString());
            localStorage.setItem(button.name + "cpcReq", button.cpcPrestigeRequirement.toString());
            localStorage.setItem(button.name + "cpsReq", button.cpsPrestigeRequirement.toString());
            localStorage.setItem(button.name + "prestigeMultiplier", button.prestigeMultiplier.toString());
            localStorage.setItem(button.name + "timesclicked", button.timesclicked.toString());
            localStorage.setItem(button.name + "completed", button.completed.toString());
        }
        localStorage.setItem("clicks", clicks.toString());
        localStorage.setItem("cpc", cpc.toString());
        localStorage.setItem("theme", theme);
        localStorage.setItem("cps", cps.toString());
        
        for (let ach of achievements) {
            localStorage.setItem("achievement_" + ach.name, ach.achieved.toString());
        }
    } catch (error) {
        console.error("Error saving game:", error);
    }
}

function load() {
    try {
        if (localStorage.getItem("clicks") !== null) {
            clicks = parseInt(localStorage.getItem("clicks")) || 0;
            cpc = parseInt(localStorage.getItem("cpc")) || 1;
            cps = parseInt(localStorage.getItem("cps")) || 0;

            for (let button of upgrades) {
                if (!button) continue;
                
                button.cost = parseInt(localStorage.getItem(button.name + "cost")) || button.start;
                button.prestige = parseInt(localStorage.getItem(button.name + "prestige")) || 0;
                button.cpc = parseInt(localStorage.getItem(button.name + "cpc")) || button.cpc;
                button.cps = parseInt(localStorage.getItem(button.name + "cps")) || button.cps;
                button.clickPrestigeRequirement = parseInt(localStorage.getItem(button.name + "clickReq")) || button.clickPrestigeRequirement;
                button.cpcPrestigeRequirement = parseInt(localStorage.getItem(button.name + "cpcReq")) || button.cpcPrestigeRequirement;
                button.cpsPrestigeRequirement = parseInt(localStorage.getItem(button.name + "cpsReq")) || button.cpsPrestigeRequirement;
                button.prestigeMultiplier = parseInt(localStorage.getItem(button.name + "prestigeMultiplier")) || 1000;
                button.timesclicked = parseInt(localStorage.getItem(button.name + "timesclicked")) || 0;
                button.completed = localStorage.getItem(button.name + "completed") === "true";
                
                // Check if prestige level is 5 or higher, set to completed
                if (button.prestige >= 5) {
                    button.completed = true;
                }
                
                // If button is completed, remove it from DOM
                if (button.completed) {
                    // Remove the prestige button if it exists
                    if (button.prestigeButton && button.prestigeButton.parentNode) {
                        button.prestigeButton.parentNode.removeChild(button.prestigeButton);
                    }
                    
                    // Remove the upgrade button if it exists
                    if (button.element && button.element.parentNode) {
                        button.element.parentNode.removeChild(button.element);
                    }
                    
                    continue; // Skip the rest of the processing for this button
                }
                
                // Update button text for non-completed buttons
                if (button.element) {
                    let message = button.name + ": Cost: " + button.cost;
                    button.element.innerHTML = message;
                
                    // Restore prestige appearance
                    button.element.style.backgroundColor = "";
                    button.element.style.color = "";
                    switch (button.prestige) {
                        case 1:
                            button.element.style.backgroundColor = "lightcoral";
                            break;
                        case 2:
                            button.element.style.backgroundColor = "aquamarine";
                            break;
                        case 3:
                            button.element.style.backgroundColor = "gold";
                            break;
                        case 4:
                            button.element.style.backgroundColor = "violet";
                            break;
                    }
                }
                
                // Check prestige availability for non-completed buttons
                if (button.checkPrestigeAvailability) {
                    button.checkPrestigeAvailability();
                }
            }
            
            for (let ach of achievements) {
                if (!ach) continue;
                ach.achieved = localStorage.getItem("achievement_" + ach.name) === "true";
            }

            theme = localStorage.getItem("theme") || "light";
            clickCount.textContent = clicks;
            if (statshow) {
                statshow.innerHTML = "CPC: " + cpc + " CPS: " + cps;
            }
            
            if (theme === "dark" && document.body) {
                document.body.classList.add("dark-mode");
            }
        }
    } catch (error) {
        console.error("Error loading game:", error);
        clearsave();
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
    try {
        alert("Save DATA reset.");
        
        // Reset game values first
        clicks = 0;
        cpc = 1;
        cps = 0;
        theme = "light";
        
        // Clear all localStorage
        localStorage.clear();
        
        // Reset upgrades to their starting values
        for (let upgrade of upgrades) {
            if (!upgrade) continue;
            
            // Get initial values
            let initialCpc = upgrade.cpc;
            let initialCps = upgrade.cps;
            
            // For buttons like up1button, up2button that already existed in HTML
            if (upgrade.name === "Coffee") {
                initialCpc = 4;
                initialCps = 0;
            } else if (upgrade.name === "Clean-up Code") {
                initialCpc = 6;
                initialCps = 0;
            } else if (upgrade.name === "AI Code Writer") {
                initialCpc = 3;
                initialCps = 3;
            } else if (upgrade.name === "Hack Computers") {
                initialCpc = 100;
                initialCps = 450;
            } else if (upgrade.name === "Late-Night Coding Grind") {
                initialCpc = 5000;
                initialCps = 300;
            }
            
            // Reset properties
            upgrade.cost = upgrade.start;
            upgrade.prestige = 0;
            upgrade.cpc = initialCpc;
            upgrade.cps = initialCps;
            upgrade.clickPrestigeRequirement = upgrade.start * 4000;
            upgrade.cpcPrestigeRequirement = initialCpc * 4000;
            upgrade.cpsPrestigeRequirement = initialCps * 4000;
            upgrade.prestigeMultiplier = 1000;
            upgrade.timesclicked = 0;
            upgrade.completed = false;
            
            // Reset button appearance
            if (upgrade.element) {
                upgrade.element.style.backgroundColor = "";
                upgrade.element.style.color = "";
                let message = upgrade.name + ": Cost: " + upgrade.cost;
                upgrade.element.innerHTML = message;
            }
            
            // Reset prestige button
            if (upgrade.prestigeButton) {
                upgrade.prestigeButton.classList.remove("available");
                upgrade.prestigeButton.classList.remove("completed");
            }
            
            if (upgrade.checkPrestigeAvailability) {
                upgrade.checkPrestigeAvailability();
            }
        }
        
        // Reset achievements
        for (let ach of achievements) {
            if (!ach) continue;
            ach.achieved = false;
        }
        
        // Update UI
        if (clickCount) {
            clickCount.textContent = clicks;
        }
        if (statshow) {
            statshow.innerHTML = "CPC: " + cpc + " CPS: " + cps;
        }
        
        // Reset theme to light mode
        if (document.body) {
            document.body.classList.remove("dark-mode");
        }
        
        // Save the reset state
        save();
    } catch (error) {
        console.error("Error clearing save:", error);
        alert("Error clearing save data. Please try again.");
    }
}

 //Async function delays for milliseconds
function wait(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}
//Toggles light and dark mode
function toggletheme() {
    switch (theme) {
        case "light":
            document.body.classList.add("dark-mode");
            theme = "dark";
            save();
            break;
        case "dark":
            document.body.classList.remove("dark-mode");
            theme = "light";
            save();
            break;
    }
}

// Initialize game
const debug = new devtools()
load();
addClicksPerSecond();