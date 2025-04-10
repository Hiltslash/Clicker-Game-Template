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