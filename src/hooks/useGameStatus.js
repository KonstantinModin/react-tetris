import { useState, useEffect, useCallback } from 'react';
import sound from '../audio/row.wav';

export const useGameStatus = rowsCleared => {
    const audio = new Audio(sound);

    const [ score, setScore ] = useState(0);
    const [ rows, setRows ] = useState(0);
    const [ level, setLevel ] = useState(0);

    const linePoints = [40, 100, 300, 1200];

    const calcScore = useCallback(() => {
        // We have score
        if ( rowsCleared > 0) {
            setScore(prev => prev + linePoints[(rowsCleared - 1)] * (level + 1));
            setRows(prev => prev + rowsCleared);
            audio.play();
        }

    }, [level, linePoints, rowsCleared]);

    useEffect(() => {
        calcScore();
    }, [calcScore, linePoints, rowsCleared]);

    return [ score, setScore, rows, setRows, level, setLevel ];
}
