import tkinter as tk
import os
import sys
root = tk.Tk()
root.title("Clicker Game Maker")
root.geometry("700x400")
sys.stdout.reconfigure(encoding='utf-8')
title = tk.Label(root, text="Clicker Game Maker", font=("Courier", 25))
title.pack()

step = 1  # Global step tracker
bstep = 1
upgrades = []
achievements = []

# Define global variables for upgrade properties
name, cpc, cps, cost, multiplier = "", 0, 0, 0, 0
aname, description, cpsr, clickr, cpcr, reward, emoji = "", "", 0, 0, 1, 0, ""

def insert_at_line(filename, line_num, text):
    with open(filename, "r") as file:
        lines = file.readlines()  # Read all lines

    lines.insert(line_num - 1, text + "\n")  # Insert text at the specified line

    with open(filename, "w") as file:
        file.writelines(lines)  # Write modified lines

def buildNewAch():
    global bstep, aname, description, cpsr, clickr, cpcr, reward, emoji  # Access global variables

    input_value = atb.get().strip()  # Get user input and remove leading/trailing spaces

    if bstep == 1:
        aname = input_value
        c.config(text="New Ach: CPC Required")
    elif bstep == 2:
        cpcr = input_value if input_value.isdigit() else 0  # Convert to number if possible
        c.config(text="New Ach: CPS Required")
    elif bstep == 3:
        cpsr = input_value if input_value.isdigit() else 0
        c.config(text="New Ach: Click Count Required")
    elif bstep == 4:
        clickr = input_value if input_value.isdigit() else 0
        c.config(text="New Ach: Description")
    elif bstep == 5:
        description = input_value
        c.config(text="New Ach: Emoji (must be text ]:)")
    elif bstep == 6:
        emoji = input_value
        c.config(text="New Ach: Reward")
    elif bstep == 7:
        reward = input_value
        print("ASDHHAISDHA")
        c.config(text="Complete")
    elif bstep == 8:
        output = f"const ach{len(achievements)} = new achievement('{aname}', {cpcr}, {cpsr}, {clickr}, '{description}', {multiplier}, {reward}, '{emoji}');"
        insert_at_line("build/script.js", 436, output)
        insert_at_line("build/script.js", 437, f"achievements.push(ach{len(achievements)})")
        achievements.append(f"ach{len(achievements) + 1}")
        updateAchList()
        c.config(text="New Achievement: Name")
        bstep = 0  # Reset step after completion

    bstep += 1  # Move to the next step
    atb.delete(0, tk.END)  # Clear entry field






def buildNewUpgrade():
    global step, name, cpc, cps, cost, multiplier  # Access global variables

    input_value = t.get().strip()  # Get user input and remove leading/trailing spaces

    if step == 1:
        name = input_value
        b.config(text="New Upgrade: CPC")
    elif step == 2:
        cpc = input_value if input_value.isdigit() else 0  # Convert to number if possible
        b.config(text="New Upgrade: CPS")
    elif step == 3:
        cps = input_value if input_value.isdigit() else 0
        b.config(text="New Upgrade: Cost")
    elif step == 4:
        cost = input_value if input_value.isdigit() else 0
        b.config(text="New Upgrade: Price Multiplier")
    elif step == 5:
        multiplier = input_value if input_value.isdigit() else 1
        b.config(text="Complete")
    elif step == 6:
        output = f"const up{len(upgrades)}button = new upgradeButton('{name}', null, {cpc}, {cps}, {cost}, {multiplier});"
        insert_at_line("build/script.js", 433, output)
        insert_at_line("build/script.js", 434, f"upgrades.push(up{len(upgrades)}button)")
        insert_at_line("build/script.js", 435, f"up{len(upgrades)}button.create()")
        upgrades.append(f"up{len(upgrades) + 1}")
        updateUpgradeList()
        step = 0  # Reset step after completion
        b.config(text="New Upgrade: Name")

    step += 1  # Move to the next step
    t.delete(0, tk.END)  # Clear entry field

def reset():
    with open("build/script.js", "r") as file:
        lines = file.readlines()  # Read all lines

    # Iterate backwards to avoid skipping lines when removing
    lines = [line for line in lines if not line.startswith("const up") and not line.startswith("up")]
    lines = [line for line in lines if not line.startswith("const ach") and not line.startswith("ach")]

    # Write the modified lines back to the file
    with open("build/script.js", "w") as file:
        file.writelines(lines)  # Write modified lines

    print("Reset completed!")

def loadUpgrades():
    with open("build/script.js", "r") as file:
        lines = file.readlines()  # Read all lines

    upgrades = [line for line in lines if line.startswith("const up") and not line.startswith("up")]
    return upgrades
def loadAchs():
    with open("build/script.js", "r") as file:
        lines = file.readlines()  # Read all lines

    achievements = [line for line in lines if line.startswith("const ach") and not line.startswith("ach") and not line.startswith("const achnoise")]
    return achievements

# Entry box for upgrade maker
t = tk.Entry(root)
t.place(x=50, y=80, width=200)

#Achievement maker button
c = tk.Button(root, text="New Achievement: Name", command=lambda: buildNewAch())
c.place(x=350, y=150)

#Entry box for achievement maker
atb = tk.Entry(root)
atb.place(x=350, y=185)

#Reset button
resetButton = tk.Button(root, text="RESET ALL!", command=reset)
resetButton.place(x=420, y=80)

# Button to progress through upgrade steps
b = tk.Button(root, text="New Upgrade: Name", command=lambda: buildNewUpgrade())
b.place(x=260, y=80)

# Listbox to display upgrades
upgradeListDisplay = tk.Listbox(root, font=("Arial", 14))
upgradeListDisplay.place(x=50, y=120)

# Listbox to display upgrades
AchListDisplay = tk.Listbox(root, font=("Arial", 14))
AchListDisplay.place(x=200, y=200)

# Function to update upgrade list display
def updateUpgradeList():
    upgradeListDisplay.delete(0, tk.END)  # Clear list before updating
    for index, item in enumerate(upgrades, start=1):
        upgradeListDisplay.insert(tk.END, f"{index}. {item}")
def updateAchList():
    AchListDisplay.delete(0, tk.END)  # Clear list before updating
    for index, item in enumerate(achievements, start=1):
        AchListDisplay.insert(tk.END, f"{index}. {item}")

upgrades = loadUpgrades()
achievements = loadAchs()
updateUpgradeList()
updateAchList()
root.mainloop()
