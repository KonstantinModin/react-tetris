import React from 'react';
import './InfoOverlay.css';

const InfoOverlay = ({ onClick, text }) => {
    return (
        <div className="InfoOverlay" onClick={onClick}>
           <h1>{text}</h1> 
        </div>
    )
}

export default InfoOverlay;
