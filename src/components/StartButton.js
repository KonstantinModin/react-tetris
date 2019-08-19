import React from 'react';
import { StyledStartButton } from '../components/styles/StyledStartButton';

import PropTypes from 'prop-types';

const StartButton = ({ callBack }) => {
    return (
        <StyledStartButton onClick={callBack}>
            Start Game
        </StyledStartButton>
    )
}

StartButton.propTypes = {

}

export default StartButton;
