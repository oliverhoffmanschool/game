const player = document.getElementById('player');
const gameContainer = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score');
let isJumping = false;
let score = 0;

// Jump logic
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' && !isJumping) {
    jump();
  }
});

function jump() {
  let position = 0;
  isJumping = true;

  const upInterval = setInterval(() => {
    if (position >= 150) {
      clearInterval(upInterval);

      const downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        }
        position -= 5;
        player.style.bottom = position + 'px';
      }, 20);
    } else {
      position += 5;
      player.style.bottom = position + 'px';
    }
  }, 20);
}

// Generate obstacles
function createObstacle() {
  const obstacle = document.createElement('div');
  obstacle.classList.add('obstacle');
  obstacle.id = 'obstacle';
  gameContainer.appendChild(obstacle);

  let obstaclePosition = 800;

  const moveObstacle = setInterval(() => {
    obstaclePosition -= 5;
    obstacle.style.left = obstaclePosition + 'px';

    if (obstaclePosition < -30) {
      clearInterval(moveObstacle);
      gameContainer.removeChild(obstacle);
    }

    if (
      obstaclePosition > 50 &&
      obstaclePosition < 100 &&
      parseInt(player.style.bottom) < 50
    ) {
      alert('Game Over! Your score: ' + score);
      document.location.reload();
    }
  }, 20);

  setTimeout(createObstacle, Math.random() * 2000 + 1000);
}

// Generate coins
function createCoin() {
  const coin = document.createElement('div');
  coin.classList.add('coin');
  coin.id = 'coin';
  gameContainer.appendChild(coin);

  let coinPosition = 800;

  const moveCoin = setInterval(() => {
    coinPosition -= 5;
    coin.style.left = coinPosition + 'px';

    if (coinPosition < -30) {
      clearInterval(moveCoin);
      gameContainer.removeChild(coin);
    }

    if (
      coinPosition > 50 &&
      coinPosition < 100 &&
      parseInt(player.style.bottom) > 100
    ) {
      score += 10;
      scoreDisplay.textContent = 'Score: ' + score;
      clearInterval(moveCoin);
      gameContainer.removeChild(coin);
    }
  }, 20);

  setTimeout(createCoin, Math.random() * 4000 + 2000);
}

createObstacle();
createCoin();
