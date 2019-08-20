import styled from 'styled-components';

export const StyledStage = styled.div`
    display: grid;
    // grid-template-rows: repeat(${props => props.height}, 3rem);
    grid-template-rows: repeat(${props => props.height}, calc(40vw / ${props => props.width}));
    // grid-template-columns: repeat(${props => props.width}, 3rem);
    grid-template-columns: repeat(${props => props.width}, 1fr);
    grid-gap: 1px;
    border: 2px solid #333;
    width: 100%;
    max-width: 40vw;
    background-color: rgba(96, 250, 12, 0.1);

`