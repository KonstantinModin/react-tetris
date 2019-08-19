import React from 'react';
import { StyledDisplay } from '../components/styles/StyledDisplay';

const Display = ({ gameOver, text}) => (
    <StyledDisplay gameOver={gameOver} >
        {text}        
    </StyledDisplay>
)


export default Display;
