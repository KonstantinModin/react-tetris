import React from "react";
import { StyledButton } from "./styles/StyledButton";

import PropTypes from "prop-types";

const Button = ({ callBack, caption, disabled }) => {
    return (
        <StyledButton onClick={callBack} disabled={disabled}>
            {caption}
        </StyledButton>
    );
};

Button.propTypes = {
    callBack: PropTypes.func.isRequired,
    caption: PropTypes.string.isRequired,
    disabled: PropTypes.bool
};

export default Button;
