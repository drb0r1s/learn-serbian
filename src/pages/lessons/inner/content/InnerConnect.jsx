import React, { useState, useEffect, useRef, act } from "react";
import checkAnswer from "../../../../functions/checkAnswer";
import { ExtendedArray } from "../../../../functions/ExtendedArray";
import { Language } from "../../../../functions/Language";

const InnerConnect = ({ block, blockJump }) => {
    const [buttons, setButtons] = useState({ left: block.left, right: block.right });
    const [activeButtons, setActiveButtons] = useState({ left: null, right: null });

    useEffect(() => {
        setButtons({
            left: block.randomize ? ExtendedArray.randomize(block.left) : block.left,
            right: block.randomize ? ExtendedArray.randomize(block.right) : block.right
        });
    }, []);

    useEffect(() => {
        if(activeButtons.left && activeButtons.right) checkConnection();
    }, [activeButtons.left, activeButtons.right])

    function updateConnection(button, position) {        
        if(button.classList.contains("button-active")) {
            activeButtons.left.classList.remove("button-active");
            return setActiveButtons(prevActiveButtons => { return {...prevActiveButtons, [position]: null} });
        }
        
        if(position === "left" && activeButtons.left) activeButtons.left.classList.remove("button-active");
        if(position === "right" && activeButtons.right) activeButtons.right.classList.remove("button-active");
        
        button.classList.add("button-active");
        setActiveButtons(prevActiveButtons => { return {...prevActiveButtons, [position]: button} });
    }

    function checkConnection() {
        const userAnswer = [
            activeButtons.left.innerText,
            activeButtons.right.innerText
        ];

        const { isCorrect } = checkAnswer(block, userAnswer, block.answers);

        if(isCorrect) alert("Correct");
        else alert("Incorrect");
    }

    return(
        <div className="lessons-inner-block lessons-inner-connect">
            <div className="lessons-inner-block-holder lessons-inner-connect-holder">
                <h3>{Language.inject(block.title)}</h3>

                <div className="lessons-inner-connect-button-holder">
                    <div className="lessons-inner-connect-button-holder-left">
                        {buttons.left.map((button, index) => {
                            return <button
                                onClick={e => updateConnection(e.target, "left")}
                                key={index}
                            >{button}</button>
                        })}
                    </div>
                    
                    <div className="lessons-inner-connect-button-holder-right">
                        {buttons.right.map((button, index) => {
                            return <button
                                onClick={e => updateConnection(e.target, "right")}
                                key={index}
                            >{button}</button>
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InnerConnect;