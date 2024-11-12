const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext('2d');
const box = 20;
let snake;
let direction;
let food;
let score;
let game;

// Initialize the game
function resetGame() {
    snake = [{ x: 9 * box, y: 10 * box }];
    direction = 'RIGHT';
    food = {
        x: Math.floor(Math.random() * 19 + 1) * box,
        y: Math.floor(Math.random() * 19 + 1) * box
    };
    score = 0;
    
    if (game) clearInterval(game); // Stop the previous game loop
    game = setInterval(draw, 100); // Start the game loop again
}

// Control the snake
document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    if (event.keyCode === 37 && direction !== 'RIGHT') {
        direction = 'LEFT';
    } else if (event.keyCode === 38 && direction !== 'DOWN') {
        direction = 'UP';
    } else if (event.keyCode === 39 && direction !== 'LEFT') {
        direction = 'RIGHT';
    } else if (event.keyCode === 40 && direction !== 'UP') {
        direction = 'DOWN';
    }
}

// Draw the snake
function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? 'green' : 'lightgreen'; // Head is dark green, body is light green
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = 'green';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box); // Snake body outline
    }
}

// Draw the food
function drawFood() {
    ctx.fillStyle = 'purple';
    ctx.fillRect(food.x, food.y, box, box);
}

// Update game state
function updateGame() {
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Move the snake in the current direction
    if (direction === 'LEFT') snakeX -= box;
    if (direction === 'UP') snakeY -= box;
    if (direction === 'RIGHT') snakeX += box;
    if (direction === 'DOWN') snakeY += box;

    // Check if the snake hits the walls (end the game)
    if (snakeX < 0 || snakeX >= 20 * box || snakeY < 0 || snakeY >= 20 * box) {
        clearInterval(game); // End the game
        alert('Game Over!🐬 You hit the wall.');
    }

    // Check if the snake eats the food
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box,
        };
    } else {
        snake.pop(); // Remove the last part of the snake (tail)
    }

    // Add new head to the snake
    let newHead = {
        x: snakeX,
        y: snakeY,
    };

    snake.unshift(newHead); // Add new head at the beginning of the array
}

// Main game loop
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    drawSnake();
    drawFood();
    updateGame();
    ctx.fillStyle = 'darkGreen';
    ctx.font = '15px times new roman ';
    ctx.fillText('Score: ' + score, box, box); // Display the score
}

// Add event listener for reset button
document.getElementById("resetButton").addEventListener('click', resetGame);

// Start the game on load
resetGame();
