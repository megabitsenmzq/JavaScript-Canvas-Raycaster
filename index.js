// Game Settings

const map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const GOAL_X = 20;
const GOAL_Y = 19;

const TICK = 30;

const CELL_SIZE = 25;

const FOV = toRadians(60);

const COLORS = {
  floor: "#E4DAC5",
  ceiling: "#EAEAEA",
  wall: "#9BCABF",
  wallAlt: "#474E68",
  wallDark: "#5CAFAF",
  wallDarkAlt: "#50577A",
  goal: "#D36560",
  rays: "#ffa600",

  mapWall: "black",
  mapPlayer: "green",
  mapPlayerDirection: "white",
};


const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

// Create Canvas
function createHiPPICanvas(width, height) {
  const ratio = window.devicePixelRatio;
  const canvas = document.createElement("canvas");

  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  canvas.getContext("2d").scale(ratio, ratio);

  return canvas;
}

const canvas = createHiPPICanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
document.body.appendChild(canvas);

const context = canvas.getContext("2d");

function renderMinimap(posX = 0, posY = 0, scale, rays) {
  const cellSize = scale * CELL_SIZE;

  // Draw Cells
  context.globalAlpha = 0.5;
  map.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        context.fillStyle = COLORS.mapWall;
        context.fillRect(
          posX + x * cellSize,
          posY + y * cellSize,
          cellSize,
          cellSize
        );
      }
    });
  });

  // Draw Player
  context.fillStyle = COLORS.mapPlayer;
  context.beginPath();
  context.arc(
    posX + player.x * scale,
    posY + player.y * scale,
    5,
    0,
    2 * Math.PI,
    false
  );
  context.closePath();
  context.fill();

  // Draw Player Direction
  context.strokeStyle = COLORS.mapPlayerDirection;
  context.beginPath();
  context.moveTo(player.x * scale, player.y * scale);
  context.lineTo(
    (player.x + Math.cos(player.angle) * 20) * scale,
    (player.y + Math.sin(player.angle) * 20) * scale
  );
  context.closePath();
  context.stroke();

  // Draw Rays
  context.strokeStyle = COLORS.rays;
  rays.forEach((ray) => {
    context.beginPath();
    context.moveTo(player.x * scale, player.y * scale);
    context.lineTo(
      (player.x + Math.cos(ray.angle) * ray.distance) * scale,
      (player.y + Math.sin(ray.angle) * ray.distance) * scale
    );
    context.closePath();
    context.stroke();
  });
  context.globalAlpha = 1;
}

function toRadians(deg) {
  return (deg * Math.PI) / 180;
}

function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function outOfMapBounds(x, y) {
  return x < 0 || x >= map[0].length || y < 0 || y >= map.length;
}

function getVCollision(angle) {
  const right = Math.abs(Math.floor((angle - Math.PI / 2) / Math.PI) % 2);

  const firstX = Math.floor(player.x / CELL_SIZE) * CELL_SIZE + (right ? CELL_SIZE : 0);
  const firstY = player.y + (firstX - player.x) * Math.tan(angle);

  const xA = right ? CELL_SIZE : -CELL_SIZE;
  const yA = xA * Math.tan(angle);

  let wall;
  let nextX = firstX;
  let nextY = firstY;
  var isGoal = false;
  while (!wall) {
    const cellX = Math.floor(nextX / CELL_SIZE) - (right ? 0 : 1);
    const cellY = Math.floor(nextY / CELL_SIZE);

    if (outOfMapBounds(cellX, cellY)) {
      break;
    }
    wall = map[cellY][cellX];
    if (!wall) {
      nextX += xA;
      nextY += yA;
    } else {
      if (cellX == GOAL_X && cellY == GOAL_Y) {
        isGoal = true
      }
    }
  }
  return {
    angle,
    distance: distance(player.x, player.y, nextX, nextY),
    vertical: true,
    isGoal: isGoal,
  };
}

function getHCollision(angle) {
  const up = Math.abs(Math.floor(angle / Math.PI) % 2);
  const firstY = Math.floor(player.y / CELL_SIZE) * CELL_SIZE + (up ? 0 : CELL_SIZE);
  const firstX = player.x + (firstY - player.y) / Math.tan(angle);

  const yA = up ? -CELL_SIZE : CELL_SIZE;
  const xA = yA / Math.tan(angle);

  let wall;
  let nextX = firstX;
  let nextY = firstY;
  var isGoal = false;
  while (!wall) {
    const cellX = Math.floor(nextX / CELL_SIZE);
    const cellY = Math.floor(nextY / CELL_SIZE) - (up ? 1 : 0);

    if (outOfMapBounds(cellX, cellY)) {
      break;
    }

    wall = map[cellY][cellX];
    if (!wall) {
      nextX += xA;
      nextY += yA;
    } else {
      if (cellX == GOAL_X && cellY == GOAL_Y) {
        isGoal = true
      }
    }
  }
  return {
    angle,
    distance: distance(player.x, player.y, nextX, nextY),
    vertical: false,
    isGoal: isGoal,
  };
}

function castRay(angle) {
  const vCollision = getVCollision(angle);
  const hCollision = getHCollision(angle);

  return hCollision.distance >= vCollision.distance ? vCollision : hCollision;
}

function fixFishEye(distance, angle, playerAngle) {
  const diff = angle - playerAngle;
  return distance * Math.cos(diff);
}

function getRays() {
  const initialAngle = player.angle - FOV / 2;
  const numberOfRays = SCREEN_WIDTH;
  const angleStep = FOV / numberOfRays;
  return Array.from({ length: numberOfRays }, (_, i) => {
    const angle = initialAngle + i * angleStep;
    const ray = castRay(angle);
    return ray;
  });
}

function renderScene(rays) {
  rays.forEach((ray, i) => {
    // Wall
    var alter = false;
    const distance = fixFishEye(ray.distance, ray.angle, player.angle);
    const wallHeight = ((CELL_SIZE * 5) / distance) * 277;
    const stripeHeight = wallHeight / 3;

    for (j = 0; j < 3; j++) {
      if (ray.vertical) {
        context.fillStyle = alter ? COLORS.wallDark : COLORS.wallDarkAlt;  
      } else {
        context.fillStyle = alter ? COLORS.wall : COLORS.wallAlt;
      }
      alter = !alter;
      if (ray.isGoal) {
        context.fillStyle = COLORS.goal;
      }
      context.fillRect(i, SCREEN_HEIGHT / 2 - wallHeight / 2 + j * stripeHeight, 1, Math.ceil(stripeHeight));
    }

    context.fillStyle = COLORS.floor;
    context.fillRect(
      i,
      SCREEN_HEIGHT / 2 + wallHeight / 2,
      1,
      SCREEN_HEIGHT / 2 - wallHeight / 2
    );
    context.fillStyle = COLORS.ceiling;
    context.fillRect(i, 0, 1, SCREEN_HEIGHT / 2 - wallHeight / 2);
  });
}

function gameLoop() {
  context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  movePlayer();
  const rays = getRays();
  renderScene(rays);
  renderMinimap(0, 0, 0.5, rays);
  drawOSD();
}

setInterval(gameLoop, TICK);

// Player
const player = {
  x: CELL_SIZE * 1.5,
  y: CELL_SIZE * 1.5,
  angle: toRadians(0),
  speedX: 0,
  speedY: 0,
};

function resetPlayer() {
  player.x = CELL_SIZE * 1.5;
  player.y = CELL_SIZE * 1.5;
  player.speedX = 0;
  player.speedY = 0;
}

function checkWallCollision(targetX, targetY) {
  var isCollision = false;
  map.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        const leftCollision = targetX >= x * CELL_SIZE;
        const rightCollision = targetX <= (x + 1) * CELL_SIZE;
        const topCollision = targetY >= y * CELL_SIZE;
        const bottomCollision = targetY <= (y + 1) * CELL_SIZE;
        if (leftCollision && rightCollision && topCollision && bottomCollision) {
          isCollision = true;
          if (x == GOAL_X && y == GOAL_Y) {
            document.exitPointerLock();
            resetPlayer();
            resetKeyState();
          }
        }
      }
    });
  });
  return isCollision;
}

function movePlayer() {
  const targetX = player.x + (Math.cos(player.angle) * player.speedY - Math.sin(player.angle) * player.speedX);
  const targetY = player.y + (Math.sin(player.angle) * player.speedY + Math.cos(player.angle) * player.speedX);
  if (!checkWallCollision(targetX, targetY)) {
    player.x = targetX;
    player.y = targetY
  }
}

// Controls

// Save keyboard state to keep moving consistently.
const keyState = {
  left: false,
  right: false,
  up: false,
  down: false
};

function resetKeyState() {
  keyState.left = false;
  keyState.right = false;
  keyState.up = false;
  keyState.down = false;
}

var pointerLockState = false;

canvas.addEventListener("click", () => {
  canvas.requestPointerLock();
});

document.addEventListener("pointerlockchange", () => {
  pointerLockState = document.pointerLockElement != null;
  if (pointerLockState) {
    resetTimer();
  }
  timerRunning = pointerLockState;
});

document.addEventListener("keydown", (e) => {
  if (!pointerLockState) { return; }
  if (e.key === "w") {
    keyState.up = true;
    player.speedY = 2;
  }
  if (e.key === "s") {
    keyState.down = true;
    player.speedY = -2;
  }
  if (e.key === "a") {
    keyState.left = true;
    player.speedX = -2;
  }
  if (e.key === "d") {
    keyState.right = true;
    player.speedX = 2;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "w") {
    keyState.up = false;
    if (!keyState.down) {
      player.speedY = 0;
    }
  }
  if (e.key === "s") {
    keyState.down = false;
    if (!keyState.up) {
      player.speedY = 0;
    }
  }
  if (e.key === "a") {
    keyState.left = false;
    if (!keyState.right) {
      player.speedX = 0;
    }
  }
  if (e.key === "d") {
    keyState.right = false;
    if (!keyState.left) {
      player.speedX = 0;
    }
  }
});

document.addEventListener("mousemove", function (event) {
  if (!pointerLockState) { return; }
  player.angle += toRadians(event.movementX);
});