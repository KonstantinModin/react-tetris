import React, { useState } from 'react';
import { createStage, checkCollision } from '../gameHelpers';
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';
import PropTypes from 'prop-types';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';

const Tetris = () => {
    const [ dropTime, setDropTime ] = useState(null);
    const [ gameOver, setGameOver ] = useState(false);

    const [ player, updatePlayerPos, resetPlayer, playerRotate ] = usePlayer();
    const [ stage, setStage ] = useStage(player, resetPlayer);

    console.log('Tetris re-renders');

    const movePlayer = dir => {
        if (!checkCollision(player, stage, {x:dir, y:0})) updatePlayerPos({x: dir, y:0});
    }

    const startGame = () => {
        setStage(createStage());
        resetPlayer();
        setGameOver(false);
    }
    
    const drop = () => {
        if (!checkCollision(player, stage, {x:0, y:1})) {
            updatePlayerPos({x:0, y:1, collided: false});
        } else {
            // Game Over
            if (player.pos.y < 1) {
                console.log('Game Over!');
                setGameOver(true);
                setDropTime(null);
            }
            updatePlayerPos({x:0, y:0, collided: true})
        }        
    }

    const dropPlayer = () => {
        drop();
    }

    const move = ({ keyCode }) => {
        if (!gameOver) {
            switch (keyCode) {
                case 37: movePlayer(-1);
                break;
                case 39: movePlayer(1);
                break;
                case 40: dropPlayer();
                break;
                case 38: playerRotate(stage, 1);
                break;
                default: return;
            }
        }
    }

    return (
        <StyledTetrisWrapper role="button" tabIndex={0} onKeyDown={move}>
            <StyledTetris>
                <Stage stage={stage} />
                <aside>
                    {gameOver ? (
                        <Display gameOver={gameOver} text="Game Over!" />
                    ) : (
                        <div>
                            <Display text="Score" />
                            <Display text="Rows" />
                            <Display text="Level" />
                        </div>
                    )}
                    <StartButton callBack={startGame}/>
                </aside>
            </StyledTetris>            
        </StyledTetrisWrapper>
    )
}

Tetris.propTypes = {

}

export default Tetris;
