import React from "react";
import useImage from "../../../../hooks/useImage";
import { Language } from "../../../../functions/Language";

const InnerDefault = ({ block, blockJump }) => {
    const image = useImage(block.image);
    
    return(
        <div className="lessons-inner-block lessons-inner-default">
            <div className="lessons-inner-block-holder lessons-inner-default-holder">
                <h3>{Language.inject(block.title)}</h3>
                <p>{Language.inject(block.description)}</p>
                
                <button onClick={blockJump}>Continue</button>
            </div>

            <img src={image} alt="IMAGE" />
        </div>
    );
}

export default InnerDefault;