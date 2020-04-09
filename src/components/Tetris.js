import React, { useState } from "react";
import { createStage, checkCollision } from "../gameHelpers";
import { StyledTetrisWrapper, StyledTetris } from "./styles/StyledTetris";
import Stage from "./Stage";
import Display from "./Display";
import Button from "./Button";
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { useInterval } from "../hooks/useInterval";
import { useGameStatus } from "../hooks/useGameStatus";
import InfoOverlay from "./InfoOverlay";
import tick from "../audio/tick.wav";
import goAudio from "../audio/gameOver.wav";
import "./Tetris.css";

const Tetris = () => {
    const aTick = new Audio(tick);
    const goSound = new Audio(goAudio);

    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [pauseGame, setPauseGame] = useState(false);

    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage, rowCleared] = useStage(player, resetPlayer);
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
        rowCleared
    );

    // console.log('Tetris re-renders');

    const movePlayer = (dir) => {
        if (!checkCollision(player, stage, { x: dir, y: 0 })) {
            updatePlayerPos({ x: dir, y: 0 });
            aTick.play();
        }
    };

    const startGame = () => {
        setStage(createStage());
        setDropTime(1000);
        resetPlayer();
        setGameOver(false);
        setScore(0);
        setRows(0);
        setLevel(0);
        setPauseGame(false);
        aTick.play();
    };

    const drop = () => {
        // increase level 10 rows
        if (!pauseGame) {
            if (rows > (level + 1) * 10) {
                setLevel((prev) => prev + 1);
                setDropTime(1000 / (level + 1) + 200);
            }

            if (!checkCollision(player, stage, { x: 0, y: 1 })) {
                updatePlayerPos({ x: 0, y: 1, collided: false });
            } else {
                // Game Over
                if (player.pos.y < 1) {
                    console.log("Game Over!");
                    setGameOver(true);
                    setDropTime(null);
                    goSound.play();
                }
                updatePlayerPos({ x: 0, y: 0, collided: true });
            }
            aTick.play();
        }
    };

    const keyUp = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 40) {
                setDropTime(1000 / (level + 1) + 200);
                console.log("interval on");
            }
        }
    };

    const dropPlayer = () => {
        setDropTime(null);
        console.log("interval off");
        drop();
    };

    const move = ({ keyCode }) => {
        if (!gameOver && !pauseGame) {
            switch (keyCode) {
                case 37:
                    movePlayer(-1);
                    break;
                case 39:
                    movePlayer(1);
                    break;
                case 40:
                    dropPlayer();
                    break;
                case 38:
                    playerRotate(stage, 1);
                    aTick.play();
                    break;
                default:
                    return;
            }
        }
    };

    const pauseGameHandler = () => {
        console.log("pause");
        setPauseGame((prev) => !prev);
    };

    useInterval(() => drop(), dropTime);

    return (
        <StyledTetrisWrapper
            role="button"
            tabIndex={0}
            onKeyDown={move}
            onKeyUp={keyUp}
        >
            {pauseGame && (
                <InfoOverlay text="Game Paused" onClick={pauseGameHandler} />
            )}
            <StyledTetris>
                <Stage stage={stage} />
                <aside>
                    {gameOver ? (
                        <div>
                            <InfoOverlay
                                text="Game Over!"
                                onClick={startGame}
                            />
                            <Display text={`Score: ${score}`} />
                            <Display gameOver={gameOver} text="Game Over!" />
                        </div>
                    ) : (
                        <div>
                            <Display text={`Score: ${score}`} />
                            <Display text={`Rows: ${rows}`} />
                            <Display text={`Level: ${level}`} />
                        </div>
                    )}
                    <Button callBack={startGame} caption="Start Game" />
                    <Button
                        callBack={pauseGameHandler}
                        caption="Pause Game"
                        disabled={!dropTime}
                    />
                </aside>
            </StyledTetris>
            <h2 className="credits"> Designed in React by Konstantin Modin </h2>
        </StyledTetrisWrapper>
    );
};

export default Tetris;
