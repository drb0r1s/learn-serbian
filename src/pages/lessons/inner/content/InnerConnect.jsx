import React, { useState, useEffect } from "react";
import { ExtendedArray } from "../../../../functions/ExtendedArray";
import { Language } from "../../../../functions/Language";

const InnerConnect = ({ block, blockJump }) => {
    const [buttons, setButtons] = useState({ left: block.left, right: block.right });

    useEffect(() => {
        setButtons({
            left: block.randomize ? ExtendedArray.randomize(block.left) : block.left,
            right: block.randomize ? ExtendedArray.randomize(block.right) : block.right
        });
    }, []);

    return(
        <div className="lessons-inner-block lessons-inner-connect">
            <div className="lessons-inner-block-holder lessons-inner-connect-holder">
                <h3>{Language.inject(block.title)}</h3>

                <div className="lessons-inner-connect-button-holder">
                    <div className="lessons-inner-connect-button-holder-left">
                        {buttons.left.map((button, index) => {
                            return <button key={index}>{button}</button>
                        })}
                    </div>
                    
                    <div className="lessons-inner-connect-button-holder-right">
                        {buttons.right.map((button, index) => {
                            return <button key={index}>{button}</button>
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InnerConnect;