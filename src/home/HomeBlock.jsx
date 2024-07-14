import React from "react";

const HomeBlock = ({ title, info, button }) => {
    return(
        <div className="home-block">
            <h2>{title}</h2>
            <p>{info}</p>
            {button ? <button>{button}</button> : <></>}
        </div>
    );
}

export default HomeBlock;