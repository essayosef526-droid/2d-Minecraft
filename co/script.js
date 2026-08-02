const world = document.querySelector(".world");
const inventoryElement = document.querySelector(".inventory");

const rows = 20;
const columns = 40;
const xy = [];
const blockTypes = ["wood", "leaves", "grass", "dirt", "coal", "stone"];
const toolTypes = ["axe", "shovel", "pickaxe"];
const inventoryTypes = [...blockTypes, ...toolTypes];
const inventory = {
  wood: 0,
  leaves: 0,
  grass: 0,
  dirt: 0,
  coal: 0,
  stone: 0,
 
};
const inventoryCount = {};
const inventoryButtons = {};
let selectedTool = null;

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

function initializeInventoryControls() {
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
  restartButton?.addEventListener("click", resetGame);
}

function updateInventory() {
  inventoryTypes.forEach((type) => {
    if (inventoryCount[type]) {
      inventoryCount[type].textContent = inventory[type];
    }
    inventoryButtons[type]?.classList.toggle("selected", selectedTool === type);
  });
}

function getBlockType(block) {
  return blockTypes.find((type) => block.classList.contains(type));
}

function canBreakWithTool(tool, blockType) {
  if (!toolTypes.includes(tool)) return true;

  const allowed = {
    pickaxe: ["stone", "coal"],
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
  
  else {
    block.classList.add("stone");
  }

  block.addEventListener("click", () => {
    const type = getBlockType(block);
    if (!type) return;
    if (!selectedTool || !toolTypes.includes(selectedTool)) return;
    if (!canBreakWithTool(selectedTool, type)) return;

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

    inventory[selectedTool] -= 1;
    block.className = `block ${selectedTool}`;
    updateInventory();
  });

  xy[row][column] = block;
  world.appendChild(block);
}

initializeInventoryControls();
resetGame();


