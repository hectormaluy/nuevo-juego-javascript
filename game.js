const btnUp = document.getElementById("up");
const btnDown = document.getElementById("down");
const btnLeft = document.getElementById("left");
const btnRight = document.getElementById("right");
const btnAgain = document.getElementById("again");
const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const spanLives = document.getElementById("lives");
const spanTime = document.getElementById("time"); 
const spanRecord = document.getElementById("record");
const pResult = document.getElementById("result");  

let canvasSize, elementSize, level = 0, lives = 3, timeStart, timePlayer, timeIntervalId, victory= false, failure = false;

const playerPosition = {
  x: undefined,
  y: undefined
};
const giftPosition = {
  x: undefined,
  y: undefined
};
let enemiesPosition = [];
let explotionsPosition = [];

 // game.fillRect(0,0,100,100);
 // game.clearRect(50,50,50,50);
 // game.clearRect(0,0,50,50);

 /*game.font = "25px Helvetica";
 game.fillStyle = "purple";
 game.textAlign = "left";
 game.fillText("Platzi",50,50);*/

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);
  
function setCanvasSize() {
  if(window.innerHeight > window.innerWidth) {
    canvasSize = parseFloat((window.innerWidth * 0.7).toFixed(2));
  } else {
    canvasSize = parseFloat((window.innerHeight * 0.7).toFixed(2));
  }

  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  elementSize = parseFloat((canvasSize / 10).toFixed(2));
  playerPosition.x = undefined;
  playerPosition.y = undefined;

  startGame();
}
 
function startGame() {
  const map = maps[level];
  if (!map) {
    gameWin();
    return;
  }
 
  if(!timeStart) {
    timeStart = Date.now();
    timeIntervalId = setInterval(showTime, 100);
    showRecord();
  }

  const mapRowCols = transformCadenaAArrayBidimensional(map);

  game.font = (elementSize - 12) + "px Arial";
  game.textAlign = 'end';
 
  showLives();
  game.clearRect(0,0,canvasSize, canvasSize);
  enemiesPosition = [];

  mapRowCols.forEach((row, indexRow) => {
    row.forEach((col, indexColumn) => {
      const emoji = emojis[col];
      const posX = parseFloat((elementSize * (indexColumn + 1)).toFixed(2));
      const posY = parseFloat((elementSize * (indexRow + 1) - 12).toFixed(2));
      const explotion = explotionsPosition.find((data) => {
        return (data.indexRow === indexRow) && (data.indexColumn === indexColumn)});

      if(col === 'O') {
        if(!playerPosition.x && !playerPosition.y) {
          playerPosition.x = posX;
          playerPosition.y = posY;
        }
      } else if (col === 'I') {
        giftPosition.x = posX;
        giftPosition.y = posY;
      } else if (col == 'X') {
        if(!explotion) {
          enemiesPosition.push({
            x: posX,
            y: posY,
            indexRow,
            indexColumn 
          });
        }
      }
      
      explotion ? game.fillText(emojis['BOMB_COLLISION'], posX, posY) : game.fillText(emoji, posX, posY);  
    });
  });

  movePlayer();
}

function transformCadenaAArrayBidimensional(cadena) {
  return cadena.trim()
        .split('\n')
        .map(elem => elem.trim())
        .map((cadena) => {return cadena.split("")});
}

btnUp.addEventListener("click", moveUp);
btnDown.addEventListener("click", moveDown);
btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);
btnAgain.addEventListener("click", restartGame);
window.addEventListener("keydown", (event) => {
  switch(event.key.toLowerCase()) {
    case "arrowup":     moveUp();
                        break;
    case "arrowdown":   moveDown();
                        break;
    case "arrowright":  moveRight();
                        break;             
    case "arrowleft":   moveLeft();
                        break;
    default: console.log("Default");
             break;
  }
});
 
function movePlayer() {
  const giftCollisionX = playerPosition.x == giftPosition.x;
  const giftCollisionY = playerPosition.y == giftPosition.y;
  const giftCollision = giftCollisionX && giftCollisionY;

  if(giftCollision) {
    levelUp();
  }

  const enemyCollision = enemiesPosition.find((enemy => {
    return (enemy.x == playerPosition.x) && (enemy.y == playerPosition.y);
  }));

  if(enemyCollision) {
    explotionsPosition.push({
      indexRow: enemyCollision.indexRow,
      indexColumn: enemyCollision.indexColumn
    });
    gameLose();
  }

  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);

  if(victory) {
    game.fillText(emojis['HAPPY'], playerPosition.x, playerPosition.y);
  }
  if(failure) {
    game.fillText(emojis['SICK'], playerPosition.x, playerPosition.y);
    pResult.innerText = "Aviso: 📢 GAME OVER";
  }
}

function levelUp() {
  level++;
  explotionsPosition = [];
  startGame();
}

function gameWin() {
  console.log("¡Terminaste el juego!");
  clearInterval(timeIntervalId);
 
  const recordTime = localStorage.getItem("record");
  const playerTime = Date.now() - timeStart;

  if(recordTime) {
    if(recordTime >= playerTime) {
      localStorage.setItem("record", playerTime);
      pResult.innerText = "Aviso: 📢 Record superado! 😃";
    } else {
      pResult.innerText = "Aviso: 📢 Record no superado. 😟";
    }
  } else {
    localStorage.setItem("record", playerTime); 
    pResult.innerText = "Aviso: 📢 Primer record establecido. 🙂";
    showRecord();
  }
  console.log({recordTime, playerTime});
  victory = true;
}

function showLives() {
  spanLives.innerText = emojis['HEART'].repeat(lives);
}

function showTime() {
  spanTime.innerHTML = formatTime(Date.now() - timeStart);
}

function showRecord() {
  spanRecord.innerHTML = localStorage.getItem("record") ? formatTime(localStorage.getItem("record")) : "No record available";
}

function formatTime(milisegundos) {
  let segundos = Math.floor(milisegundos / 1000);
  const minutos = Math.floor(segundos / 60);
  segundos = segundos >= 60 ? Math.floor(segundos - (60 * minutos)) : segundos;
  return `${minutos} minutos ${segundos} segundos`;
}

function gameLose() {
  lives--;
  if (lives == 0) {
    //level = 0;
    //lives = 3;
    //timeStart = undefined;
    //explotionsPosition = [];
    clearInterval(timeIntervalId);
    failure = true;
  } 
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
}

function moveUp() {
  console.log({playerPosition,elementSize,canvasSize});
  if(failure) {
    return;
  }
  if(parseFloat((playerPosition.y - elementSize).toFixed(2))<= 0) {
    return;
  }
  playerPosition.y = parseFloat((playerPosition.y - elementSize).toFixed(2));
  startGame();
}

function moveDown() {
  console.log({playerPosition,elementSize,canvasSize});
  if(failure) {
    return;
  }
  if(parseFloat((canvasSize - playerPosition.y).toFixed(2)) < elementSize) {
    return;
  }
  playerPosition.y = parseFloat((playerPosition.y + elementSize).toFixed(2));
  startGame();
}

function moveLeft() {
  console.log({playerPosition,elementSize,canvasSize});
  if(failure) {
    return;
  }
  if(playerPosition.x <= elementSize) {
    return;
  }
  playerPosition.x = parseFloat((playerPosition.x - elementSize).toFixed(2));
  startGame();
}

function moveRight() {
  console.log({playerPosition,elementSize,canvasSize});
  if(failure) {
    return;
  }
  if(parseFloat((canvasSize - playerPosition.x).toFixed(2)) < elementSize) {
    return;
  }
  playerPosition.x = parseFloat((playerPosition.x + elementSize).toFixed(2));
  startGame(); 
}

function restartGame() {
  explotionsPosition = [];
  enemiesPosition = [];
  lives = 3;
  level = 0;
  timeStart = undefined;
  victory= false; 
  failure = false;
  timeIntervalId = undefined;
  pResult.innerText = "";
  giftPosition.x = undefined;
  giftPosition.y = undefined;
  playerPosition.x= undefined;
  playerPosition.y= undefined;
  setCanvasSize();
}
