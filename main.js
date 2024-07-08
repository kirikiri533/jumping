let character = document.getElementById("character");
let characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue("bottom"));
let characterRight = parseInt(window.getComputedStyle(character).getPropertyValue("right"));
let characterWidth = parseInt(window.getComputedStyle(character).getPropertyValue("width"));
//window.getComputedStyle(character) CSSプロパティの値を含むオブジェクトを返す
let ground = document.getElementById("ground");
let groundBottom = parseInt(window.getComputedStyle(ground).getPropertyValue("bottom"));
let groundHeight = parseInt(window.getComputedStyle(ground).getPropertyValue("height"));

let isJumping = false;
let upTime;  //ジャンプしている時間(上昇中)を管理
let downTime;//ジャンプしている時間(落下中)を管理
const JUMP_SPEED = 10;
const JUMP_HEIGHT = 250;
const OBSTACLE_SPEED = 5;

let displayScore = document.getElementById("score");
let score = 0;
const CLEAR_SCORE = 100;

function showScore() {
  score++;
  displayScore.innerText = score;
}

setInterval(showScore, 100);

function Jump() {
  if(isJumping) return;
  upTime = setInterval(() => {
    if (characterBottom >= groundHeight + JUMP_HEIGHT) {
      clearInterval(upTime);
      downTime = setInterval(() => {
        if (characterBottom <= groundHeight) {
          clearInterval(downTime);
          isJumping = false;
        }
        characterBottom -= JUMP_SPEED;
        character.style.bottom = characterBottom + "px";
      }, 20);
    }
    characterBottom += JUMP_SPEED;
    character.style.bottom = characterBottom + "px";
    isJumping = true;
  }, 20);
}

function generateObstacle() {
  let obstacles = document.querySelector(".obstacles");
  let obstacle = document.createElement("div");
  obstacle.setAttribute("class", "obstacle");
  obstacles.appendChild(obstacle);

  let randomTimeout = Math.floor(Math.random() * 1000) + 1000;
  let obstacleRight = parseInt(window.getComputedStyle(obstacle).getPropertyValue("right"));
  let obstacleBottom = parseInt(window.getComputedStyle(obstacle).getPropertyValue("bottom"));
  let obstacleWidth = parseInt(window.getComputedStyle(obstacle).getPropertyValue("width"));
  let obstacleHeight = Math.floor(Math.random() * JUMP_HEIGHT/4) + JUMP_HEIGHT/5;

  function moveObstacle() {
    obstacleRight += OBSTACLE_SPEED;
    obstacle.style.right = obstacleRight + "px";
    obstacle.style.bottom = obstacleBottom + "px";
    obstacle.style.width = obstacleWidth + "px";
    obstacle.style.height = obstacleHeight + "px";
    if (characterRight >= obstacleRight - characterWidth && characterRight <= obstacleRight + obstacleWidth && characterBottom <= obstacleBottom + obstacleHeight) {
      alert(`ゲームオーバー`);
      clearInterval(obstacleInterval);
      clearTimeout(obstacleTimeout);
      location.reload();
    }
    if (score > CLEAR_SCORE) {
      alert("ゲームクリア");
      clearInterval(obstacleInterval);
      clearTimeout(obstacleTimeout);
      location.reload();
    }
  }

  let obstacleInterval = setInterval(moveObstacle, 20);
  let obstacleTimeout = setTimeout(generateObstacle, randomTimeout);
}

generateObstacle();

function control(e) {
  if (e.key == "ArrowUp") {
    Jump();
  }
}

document.addEventListener("keydown", control);