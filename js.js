const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const input = new Input();

const balls = [];





let ballPair = new BallPair(112, 32 * 5 + 16);
balls.push(ballPair.primaryBall);
balls.push(ballPair.secondaryBall);

balls.push(new Ball(32 * 2, 32 * 2 + 16, 0)); // Add a third ball for the pair
balls.push(new Ball(32 * 2, 32 * 3 + 16, 0)); // Add a third ball for the pair
balls.push(new Ball(32 * 3, 32 * 2 + 16, 0)); // Add a third ball for the pair

for (let row = 0; row < 16; row++) {
    for (let col = 0; col < 8; col++) {
        const isWall = !col || !row || col == 7 || row == 15;
        if (isWall) {
            balls.push(new Ball(col * 32 + 16, row * 32 + 16, 0));
        }
    }
}

const colors = ['#808080', '#f00', '#0f0', '#00f', '#ff0'];

function findConnectedGroups(grid) {
    const height = grid.length;
    const width = grid[0].length;
    const result = Array(height).fill().map(() => Array(width).fill(false));
    const visited = Array(height).fill().map(() => Array(width).fill(false));

    // Find connected components of size 4 or more
    const findGroup = (row, col, value) => {
        if (row < 0 || row >= height || col < 0 || col >= width || value === 0 ||
            visited[row][col] || grid[row][col] !== value) {
            return 0;
        }

        visited[row][col] = true;
        return 1 +
            findGroup(row - 1, col, value) +
            findGroup(row + 1, col, value) +
            findGroup(row, col - 1, value) +
            findGroup(row, col + 1, value);
    };

    // Mark groups of 4+ connected cells
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            if (!visited[row][col]) {
                const groupSize = findGroup(row, col, grid[row][col]);
                if (groupSize >= 4) {
                    visited.forEach((visitedRow, r) =>
                        visitedRow.forEach((isVisited, c) => {
                            if (isVisited && grid[r][c] === grid[row][col]) {
                                result[r][c] = true;
                            }
                        })
                    );
                }
            }
        }
    }

    return result;
}


const gameLoop = () => {


    const st = Date.now();
    balls.sort((a, b) => b.y - a.y);
    const iv = input.get();
    if (iv) {
        const ml = 4, mr = 6, md = 2, mu = 8, rs = 5;
        if (iv == ml) ballPair.move(-32, 0, balls);
        else if (iv == mr) ballPair.move(32, 0, balls);
        else if (iv == md) ballPair.move(0, 32, balls);
        else if (iv == mu) ballPair.move(0, -32, balls);
        else if (iv == rs) {
            if (input.pnt.x < innerWidth / 4 || input.pnt.x > innerWidth * 3 / 4) {
                ballPair = new BallPair(112, 176);
                balls.push(ballPair.primaryBall, ballPair.secondaryBall);
            } else ballPair.rotate(balls);
        }
    }
    ballPair.update(balls);
    if (ballPair.frz > 60) {
        ballPair = new BallPair(112, 176);
        balls.push(ballPair.primaryBall, ballPair.secondaryBall);
    }
    balls.forEach(b => {
        if (b === ballPair.primaryBall || b === ballPair.secondaryBall) return;
        b.update(balls);
    });

    const grid = Array.from({ length: 16 }, () => Array(8).fill(0));
    const ballmap = Array.from({ length: 16 }, () => Array(8).fill(null));
    balls.forEach(b => {
        if (b.c) {
            if (b.y % 32 !== 16) return; // Ensure y is aligned to the grid
            if (b.x % 32 !== 16) return; // Ensure x is aligned to the grid
            if (b.frz < 60) return; // Ensure the ball is frozen
            const row = Math.floor(b.y / 32);
            const col = Math.floor(b.x / 32);
            if (row >= 0 && row < 16 && col >= 0 && col < 8) {
                grid[row][col] = b.c;
                ballmap[row][col] = b;
            }
        }
    });
    const connectedGroups = findConnectedGroups(grid);
    for (let row = 0; row < 16; row++) {
        for (let col = 0; col < 8; col++) {
            if (connectedGroups[row][col]) {
                const ball = ballmap[row][col];
                if (ball) {
                    balls.splice(balls.indexOf(ball), 1);
                }
            }
        }
    }


    context.clearRect(0, 0, 256, 512);
    balls.forEach(b => {
        context.fillStyle = colors[b.c];
        context.beginPath();
        context.arc(b.x, b.y, 16, 0, Math.PI * 2);
        context.fill();
    });


    console.log((Date.now() - st).toFixed(3));

    requestAnimationFrame(gameLoop);
};

gameLoop();
