import styled from "styled-components";

export const StyledDisplay = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    margin: 0 0 20px 0;
    padding: 20px;
    border: 4px solid #333;
    min-height: 30px;
    width: 100%;
    border-radius: 3px;
    color: ${(props) => (props.gameOver ? "red" : "chartreuse")};
    background: rgba(0, 0, 0, 0.5);
    font-family: Pixel, Arial, Helvetica, sans-serif;
    font-size: 0.8rem;
`;
