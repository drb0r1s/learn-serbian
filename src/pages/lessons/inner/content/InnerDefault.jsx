import React from "react";
import useImage from "../../../../hooks/useImage";

const InnerDefault = ({ block }) => {
    const pikachuIcon = useImage("pikachuIcon");
    
    return(
        <div className="lessons-inner-default">
            <h3>{block.title}</h3>

            <div className="lesson-inner-default-description-holder">
                <p>{block.description}</p>
                <img src={pikachuIcon} alt="PIKACHU" />
            </div>

            <button>Continue</button>
        </div>
    );
}

export default InnerDefault;