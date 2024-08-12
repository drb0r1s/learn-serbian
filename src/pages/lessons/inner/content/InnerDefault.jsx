import React from "react";
import useImage from "../../../../hooks/useImage";

const InnerDefault = ({ block, blockJump }) => {
    const image = useImage(block.image);
    
    return(
        <div className="lessons-inner-default">
            <div className="lessons-inner-default-holder">
                <h3>{block.title}</h3>
                <p>{block.description}</p>
                
                <button onClick={blockJump}>Continue</button>
            </div>

            <img src={image} alt="PIKACHU" />
        </div>
    );
}

export default InnerDefault;