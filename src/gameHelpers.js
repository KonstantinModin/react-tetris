export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () => 
    Array.from(Array(STAGE_HEIGHT), () => Array(STAGE_WIDTH).fill([0, 'clear']));

export const checkCollision = (player, stage, {x: moveX, y: moveY }) => {
    for (let y = 0; y < player.tetromino.length; y++) {
        for (let x = 0; x < player.tetromino[y].length; x++) {
            // check if we are on actual Tetromino cell
            if (player.tetromino[y][x] !== 0) {
                if (
                // move is inside game areas height
                // bottom out prevention
                !stage[y + player.pos.y + moveY] || 
                // move is inside game areas width
                !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
                // check colliding
                stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear'
                ) {
                    return true;
                }
            }
        }
    }
}