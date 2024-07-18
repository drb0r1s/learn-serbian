import React from "react";

const HomeBlock = ({ title, image, info, button, isMobile }) => {
    return(
        <div className="home-block">
            <h2>{title}</h2>
            {isMobile ? <img src={image} alt="BLOCK"></img> : <></>}
            <p>{info}</p>
            {button ? <button>{button}</button> : <></>}
        </div>
    );
}

export default HomeBlock;