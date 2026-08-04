const world = document.querySelector(".world");
const inventoryElement = document.querySelector(".inventory");
const backgroundMusic = new Audio('../img/2026-08-04 19-59-28.mp4');
backgroundMusic.loop = true;
backgroundMusic.play();

const rows = 20;
const columns = 40;
const xy = [];
const blockTypes = ["wood", "leaves", "grass", "dirt", "coal", "stone", "dim", "iron"];
const toolTypes = ["axe", "shovel", "pickaxe"];
const inventoryTypes = [...blockTypes, ...toolTypes];
const inventory = {
  wood: 0,
  leaves: 0,
  grass: 0,
  dirt: 0,
  coal: 0,
  stone: 0,
  dim: 0,
  iron: 0,
 
};
const inventoryCount = {};
const inventoryButtons = {};
let selectedTool = null;
 const clickSound = new Audio("../img/Click_stereo.ogg.mp3");
const soundleaves = new Audio('../img/Vine_climb3.ogg.mp3');
const sounddirt = new Audio('../img/Rooted_Dirt_break3.ogg (1).mp3');
const soundstone = new Audio('../img/Stone_dig3.ogg');
const soundwood = new Audio('../img/Wood_dig2.ogg.mp3');
function formatLabel(type) {
  return type === "pickaxe" ? "Pickaxe" : type.charAt(0).toUpperCase() + type.slice(1);
}


function resetGame() {
  world.innerHTML = "";
  selectedTool = null;
  xy.length = 0;
  

  Object.keys(inventory).forEach((type) => {
    inventory[type] = 0;
  });

  updateInventory();

  for (let row = 0; row < rows; row++) {
    xy[row] = [];
    for (let column = 0; column < columns; column++) {
      addBlock(row, column);
    }
  }
}

function InventoryControls() {
  inventoryElement.querySelectorAll(".inventory-item").forEach((button) => {
    const type = button.classList[1];
    inventoryButtons[type] = button;

    if (blockTypes.includes(type)) {
      inventoryCount[type] = button.querySelector(".count");
    }

    button.addEventListener("click", () => {
      selectedTool = selectedTool === type ? null : type;
      updateInventory();
    });
  });

  const restartButton = inventoryElement.querySelector(".restart-button");
  restartButton?.addEventListener("click", () => {
   
    
    clickSound.play()
    resetGame();
  });
}

function updateInventory() {
  inventoryTypes.forEach((type) => {
    if (inventoryCount[type]) {
      inventoryCount[type].textContent = inventory[type];
    }
    inventoryButtons[type]?.classList.toggle("selected", selectedTool === type);
  });

  document.body.classList.remove("tool-axe", "tool-shovel", "tool-pickaxe");
  if (toolTypes.includes(selectedTool)) {
    document.body.classList.add(`tool-${selectedTool}`);
  }
}

function getBlockType(block) {
  return blockTypes.find((type) => block.classList.contains(type));
}

function canBreakWithTool(tool, blockType) {
  if (!toolTypes.includes(tool)) return true;

  const allowed = {
    pickaxe: ["stone", "coal", "dim", "iron"],
    shovel: ["grass", "dirt"],
    axe: ["leaves", "wood"],
  };

  return allowed[tool]?.includes(blockType);
}
function addBlock(row, column) {
  const block = document.createElement("div");
  block.classList.add("block");
  

  if ((row === 9 && column === 10) || (row === 10 && column === 10) || (row === 11 && column === 10)||
  (row === 9 && column === 30) || (row === 10 && column === 30) || (row === 11 && column === 30)) {
    block.classList.add("wood");
  }
  
  else if ((row === 8 && column === 10) || (row === 7 && column === 10) || (row === 8 && column === 11) ||
           (row === 8 && column === 9) || (row === 9 && column === 11) || (row === 9 && column === 9)||
          (row === 8 && column === 30) || (row === 7 && column === 30) || (row === 8 && column === 31) ||
           (row === 8 && column === 29) || (row === 9 && column === 31) || (row === 9 && column === 29)) {
    block.classList.add("leaves");
  }
  else if (row >= 0 && row <= 11) {
    block.className = "block empty";
  }
  else if (row === 12) {
    block.classList.add("grass");
  }
  else if (row === 13 || row === 14) {
    block.classList.add("dirt");
  }
  else if ((row === 16 && column === 3) || (row === 16 && column === 4) || (row === 16 && column === 5)) {
    block.classList.add("coal");
  }
  else if ((row === 17 && column === 20) || (row === 17&& column === 21) || (row === 17 && column === 22)) {
    block.classList.add("dim");
  }
  else if ((row === 18 && column === 10) || (row === 18 && column === 11) || (row === 18 && column === 12)) {
    block.classList.add("iron");
  }
  else {
    block.classList.add("stone");
  }

  block.addEventListener("click", () => {
    const type = getBlockType(block);
    if (!type) return;
    if (!selectedTool || !toolTypes.includes(selectedTool)) return;
    if (!canBreakWithTool(selectedTool, type)) return;
    if (type  === "leaves") {
      soundleaves.play();
    }
    if ((type  === "dirt")||(type  === "grass")) {
      sounddirt.play();
    }
    if ((type  === "wood")) {
      soundwood.play();
    }
    if ((type  === "stone")||(type  === "coal")||(type  === "dim")||(type  === "iron")) {
      soundstone.play();
    }
    inventory[type] += 1;
    updateInventory();
    block.className = "block empty";
  });

  block.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    const blockType = getBlockType(block);
    if (blockType) return;
    if (!selectedTool || toolTypes.includes(selectedTool)) return;
    if (inventory[selectedTool] <= 0) return;
    if (selectedTool  === "leaves") {
      soundleaves.play();
    }
    if ((selectedTool  === "dirt")||(selectedTool  === "grass")) {
      sounddirt.play();
    }
    if ((selectedTool  === "wood")) {
      soundwood.play();
    }
    if ((selectedTool  === "stone")||(selectedTool  === "coal")||(selectedTool  === "dim")||(selectedTool  === "iron")) {
      soundstone.play();
    }
    inventory[selectedTool] -= 1;
    block.className = `block ${selectedTool}`;
    updateInventory();
  });

  xy[row][column] = block;
  world.appendChild(block);
}

InventoryControls();
resetGame();


