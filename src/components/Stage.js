import React from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';
import { StyledStage } from '../components/styles/StyledStage';

const Stage = ({ stage }) => {    
    return (
        <StyledStage width={stage[0].length} height={stage.length}>
           {stage.map(row => row.map((cell, x)=> <Cell key={x} type={cell[0]}/>))}
        </StyledStage>
    )
}

Stage.propTypes = {
   stage: PropTypes.array.isRequired
}

export default Stage;
