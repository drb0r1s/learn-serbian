import React from "react";
import useImage from "../../../../hooks/useImage";

const InnerDefault = ({ block }) => {
    const pikachuIcon = useImage("pikachuIcon");
    
    return(
        <div className="lessons-inner-default">
            <div className="lessons-inner-default-holder">
                <h3>{block.title}</h3>
                <p>{block.description}</p>
                
                <button>Continue</button>
            </div>

            <img src={pikachuIcon} alt="PIKACHU" />
        </div>
    );
}

export default InnerDefault;