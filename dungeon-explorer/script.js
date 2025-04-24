let health = 10;
let maxHealth = 10;
let mana = 10;
let maxMana = 10;
let supplies = 3;
let maxSupplies = 5;
let level = 1;
let levelLength = 5;
let levelProgress = 0;

const healthCount = document.querySelector('#health-count');
const manaCount = document.querySelector('#mana-count');
const supplyCount = document.querySelector('#supply-count');
const pathfinderStatus = document.querySelector('#pathfinder-status');
const shroudStatus = document.querySelector('#shroud-status');
const levelCount = document.querySelector('#level-count');
const mainScreen = document.querySelector('#main-screen');
const stats = document.querySelector('#stats');
const descriptionText = document.querySelector('#description-text');
const newGameButton = document.querySelector('#new-game');
const controls = document.querySelector('#controls');
const animations = document.querySelector('#animations');

const dungeonActions = [
    {
        text: "explore dungeon",
        action: exploreDungeon,
        description: "You journey further into the dungeon, looking for the way down...",
    },
    {
        text: "make camp",
        action: makeCamp,
        description: "You make camp",
    },
    {
        text: "open spellbook",
        action: openSpells,
        description: "You open your spellbook",
    }
];

const campActions = [
    {
        text: "look for supplies",
        action: findSupplies,
        description: "You look for supplies",
    },
    {
        text: "rest",
        action: rest,
        description: "you rest and recover"
    },
    {
        text: "break camp",
        action: backToDungeon,
        description: "you break camp",
    }
];

const explorationSpells = [
    {
        text: "pathfinder",
        action: function() {castSpell(0)},
        description: "silver energy radiates from your eyes before fading. you see the way forward marked by a glowing path, you will not fall prey to traps",
        manaCost: 2,
        isActive: false,
        imgSrc: "./images/004-map-color.png",
        imgLocator: pathfinderStatus,
    },
    {
        text: "monster shroud",
        action: function() {castSpell(1)},
        description: "an arcane, black cloak appears and swirls onto your shoulders. monsters cannot discern you and will not attack",
        manaCost: 4,
        isActive: false,
        imgSrc: "./images/005-ghost-color.png",
        imgLocator: shroudStatus,
    },
    {
        text: "heal wounds",
        action: function() {castSpell(2)},
        description: "golden light washes over you, healing some of your wounds. you heal 2 points of health",
        manaCost: 2,
    },
    {
        text: "close spellbook",
        action: backToDungeon,
        description: "You close your spellbook and return to exploring",
    }
];

const exploreResults = [
    {
        result: "trap but pathfinder",
        description: "a deadly trap bars your way, but your pathfinder spell helps you navigate safely through it"
    },
    {
        result: "damaged by trap",
        description: "you spot the trap too late!",
    },
    {
        result: "monster but shrouded",
        description: "you turn the corner and come face to face with a monster, but your shroud allows you to pass unnoticed",
    },
    {
        result: "monster fight",
        description: "a monster spots you and rushes to attack - time to fight!",
    },
    {
        result: "uneventful",
        description: "you progress through the dark hallways, but encounter nothing of note",
    }
];

const combatActions = [
    {
        text: "sword attack",
        action: function() {createButtons(swordAttacks)},
        description: "You journey further into the dungeon, looking for the way down...",
    },
    {
        text: "attack spell",
        action: function() {createButtons(spellAttacks)},
        description: "You make camp",
    },
    {
        text: "heal",
        action: function() {createButtons(healActions)},
        description: "You open your spellbook",
    }
];

const swordAttacks = [
    {
        text: "thrust",
        action: attackMonster,
        description: "you try to stick the monster with the pointy end of your sword",
    },
    {
        text: "defensive slash",
        action: attackMonster,
        description: "you slash at the monster while backpedaling, making it hard for the monster to hit you",
    },
    {
        text: "aggressive slash",
        action: attackMonster,
        description: "you sell-out to slash the monster! it is easy for you to make contact and you do more damage, but you open yourself up to attacks as well",
    },
    {
        text: "back",
        action: function() {createButtons(combatActions)},
    }
];

const spellAttacks = [
    {
        text: "arcane bolt",
        action: attackMonster,
        manaCost: 1,
        description: "you launch a simple magical attack at the monster",
    },
    {
        text: "hailstorm",
        action: attackMonster,
        manaCost: 3,
        description: "you create a violent hailstorm around the monster, doing damage and impairing their ability to target you",
    },
    {
        text: "fire lance",
        action: attackMonster,
        manaCost: 5,
        description: "you summon a firey spear in your hand to hurl at your enemies, this spell does massive damage",
    },
    {
        text: "back",
        action: function() {createButtons(combatActions)},
    }
];

const healActions = [
    {
        text: "magical healing",
        action: attackMonster,
        manaCost: 5,
        description: "you summon a firey spear in your hand to hurl at your enemies, this spell does massive damage",
    },
    {
        text: "back",
        action: function() {createButtons(combatActions)},
    }
];

let liveArray = [];

function randomInt(max) {
    const randomNum = Math.floor(Math.random() * max);
    return randomNum;
};

function updateResources() {
    healthCount.innerHTML = health;
    manaCount.innerText = mana;
    supplyCount.innerText = supplies;
    levelCount.innerText = level;

    const liveStats = `
    <ul>
        <li>Max Health: ${maxHealth}</li>
        <li>Max Mana: ${maxMana}</li>
        <li>Level Progress: ${levelProgress}</li>
        <li>Level Length: ${levelLength}</li>
    </ul>
    `;
    stats.innerHTML = liveStats;
};

function setLevelLength() {
    const levelMod = level + 1;
    levelLength = 2 + level + randomInt(levelMod);
};

function createButtons(buttonArray) {
    controls.innerHTML = ``;
    buttonArray.forEach((obj) => {
        const button = document.createElement('button');
        button.textContent = obj.text;
        button.onclick = obj.action;
        controls.appendChild(button);
    });
};

function describeAction(str) {
    const paragraph = document.createElement('p');
    paragraph.textContent = str;

    if (descriptionText.childElementCount >= 3) {
        descriptionText.removeChild(descriptionText.firstChild);
    };

    descriptionText.appendChild(paragraph);
};

newGameButton.addEventListener("click", () => {
        newGameButton.remove();
        newLevel();
    }
);

function newLevel() {
    updateResources();
    setLevelLength();
    createButtons(dungeonActions);
};

function exploreDungeon() {
    //createButtons([]);
    //animations.innerHTML = `<img src="./images/explore.gif">`;
    descriptionText.innerHTML = ``;
    describeAction(dungeonActions[0].description);

    if (checkForMonster()) {
        monsterFight();
    } else if (checkForTrap()) {
        springTrap();
    } else {
        describeAction(exploreResults[4].description);
    }

    levelProgress++;

    if (levelProgress >= levelLength) {
        level++;
        levelProgress = 0;
        newLevel();
    }

    updateResources();
    createButtons(dungeonActions);
};

function makeCamp() {
    descriptionText.innerHTML = ``;
    updateResources();
    describeAction(dungeonActions[1].description);
    createButtons(campActions);
    liveArray = campActions;
};

function openSpells() {
    descriptionText.innerHTML = ``;
    updateResources();
    describeAction(dungeonActions[2].description);
    createButtons(explorationSpells);
    liveArray = explorationSpells;
};

function checkForTrap() {
    if (Math.random() <= .333) {
        return true;
    } else {
        return false;
    };
};

function springTrap() {
    if (explorationSpells[0].isActive) {
        describeAction(exploreResults[0].description);
    } else {
        describeAction(exploreResults[1].description);
        const trapDamage = 1 + randomInt(level);
        doDamage(trapDamage);
    }
};

function checkForMonster() {
    if (Math.random() <= .25) {
        return true;
    } else {
        return false;
    };
};

function monsterFight() {
    if (shrouded) {
        describeAction(exploreResults[2].description);
    } else {
        describeAction(exploreResults[3].description);
        const monsterDmg = 1 + randomInt(level);
        doDamage(monsterDmg);
    }
};

function findSupplies() {
    let overflowStr = "";

    if (supplies == maxSupplies) {
        overflowStr = `you can only carry so much and your pack is full, no point in looking for supplies right now`;
        describeAction(overflowStr);
        return;
    };

    const supplyOdds = randomInt(10);
    let suppliesFound = 0;
    let cacheStr = "";
    switch (true) {
        case supplyOdds > 0 && supplyOdds < 8:
            suppliesFound = 1;
            cacheStr = "you find a small patch of (probably) edible mushrooms. and your friends say you aren't a fun guy!"
            break;
        case supplyOdds == 8:
            suppliesFound = 2;
            cacheStr = "a wandering kobold warband is having a feast, you somehow secure an invite!";
            break;
        case supplyOdds == 9:
            suppliesFound = 3;
            cacheStr = "you stumble upon a recently dead adventurer with a rather full backpack. there loss is your gain!";
            break;
        default:
            cacheStr = "it can be hard to find food down here, do not take it as a character flaw!";
    };

    const supplyStr = `you find ${suppliesFound} days worth of supplies`;
    describeAction(cacheStr);
    describeAction(supplyStr);

    supplies += suppliesFound;
    if (supplies > maxSupplies) {
        overflowStr = `you can only carry so much and you have to leave ${supplies - maxSupplies} days worth of supplies behind`;
        supplies = maxSupplies;
        describeAction(overflowStr);
    };

    updateResources();
};

function rest() {
    if (supplies < 1) {
        describeAction("you open your pack but have no supplies. you go to sleep hungry, and regain no health or mana");
        return;
    }

    supplies--;
    const healthRegain = 1 + (randomInt(3));
    const manaRegain = 2 + randomInt(5);

    health += healthRegain;
    if (health > maxHealth) {
        health = maxHealth;
    };

    mana += manaRegain;
    if (mana > maxMana) {
        mana = maxMana;
    };
    updateResources();
};

function backToDungeon() {
    updateResources();
    const arrayLength = liveArray.length - 1;
    describeAction(liveArray[arrayLength].description);
    createButtons(dungeonActions);
};

function doDamage(int) {
    health -= int;
    const damageStr = `you take ${int} damage`;
    describeAction(damageStr);
    updateResources();
};

function castSpell(int) {
    if (int == 2) {
        health += 2;

        if (health > maxHealth) {
            health = maxHealth;
        };
        
        mana -= explorationSpells[int].manaCost;
        describeAction(explorationSpells[int].description);
        updateResources();
    } else if (explorationSpells[int].isActive) {
        describeAction("you already have this spell active");
        return;
    }; 

    explorationSpells[int].isActive = true;
    explorationSpells[int].imgLocator.src = explorationSpells[int].imgSrc;
    explorationSpells[int].imgLocator.classList.add("active-status");
    mana -= explorationSpells[int].manaCost;
    describeAction(explorationSpells[int].description);
    updateResources();
};

function combat(monster) {
    console.log("monster");
};

function attackMonster() {

}