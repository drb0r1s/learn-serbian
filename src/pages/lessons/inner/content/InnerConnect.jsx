import React, { useState, useEffect, useRef } from "react";
import useAttempts from "../../../../hooks/useAttempts";
import checkAnswer from "../../../../functions/checkAnswer";
import { ExtendedArray } from "../../../../functions/ExtendedArray";
import { Language } from "../../../../functions/Language";

const InnerConnect = ({ block, blockJump }) => {
    const [buttons, setButtons] = useState({ left: block.left, right: block.right });
    const [activeButtons, setActiveButtons] = useState({ left: null, right: null });

    const buttonElements = useRef({ left: [], right: [] });

    const { noAttempts, newAttempt } = useAttempts(block);
    
    useEffect(() => {
        setButtons({
            left: block.randomize ? ExtendedArray.randomize(block.left) : block.left,
            right: block.randomize ? ExtendedArray.randomize(block.right) : block.right
        });
    }, []);

    useEffect(() => {
        if(activeButtons.left && activeButtons.right) checkConnection();
    }, [activeButtons.left, activeButtons.right]);

    useEffect(() => { if(noAttempts) makeCorrectConnections() }, [noAttempts]);

    function updateConnection(button, position) {        
        if(
            button.classList.contains("button-blocked") ||
            button.classList.contains("button-invalid")
        ) return;
        
        if(button.classList.contains("button-active")) {
            activeButtons.left?.classList.remove("button-active");
            activeButtons.right?.classList.remove("button-active");
            
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

        if(isCorrect) {
            activeButtons.left.classList.add("button-correct", "button-invalid");
            activeButtons.right.classList.add("button-correct", "button-invalid");
        
            setActiveButtons({ left: null, right: null });
        }

        else {
            updateBlockedButtons(true);
            
            activeButtons.left.classList.remove("button-active");
            activeButtons.right.classList.remove("button-active");
            
            activeButtons.left.classList.add("button-incorrect", "button-invalid");
            activeButtons.right.classList.add("button-incorrect", "button-invalid");
        
            setTimeout(() => {
                activeButtons.left.classList.remove("button-incorrect", "button-invalid");
                activeButtons.right.classList.remove("button-incorrect", "button-invalid");
            
                setActiveButtons({ left: null, right: null });
                updateBlockedButtons(false);
            }, 600);

            newAttempt();
        }
    }

    function makeCorrectConnections() {
        const correctLeft = block.left;
        const correctRight = [];

        for(let i = 0; i < correctLeft.length; i++) {
            for(let j = 0; j < block.answers.length; j++) {
                if(correctLeft[i] === block.answers[j][0]) correctRight.push(block.answers[j][1]);
            }
        }

        setButtons({ left: correctLeft, right: correctRight });
    }

    function updateBlockedButtons(block) {
        buttonElements.current.left.forEach(buttonLeft => {
            if(block) buttonLeft.classList.add("button-blocked");
            else buttonLeft.classList.remove("button-blocked");
        });

        buttonElements.current.right.forEach(buttonRight => {
            if(block) buttonRight.classList.add("button-blocked");
            else buttonRight.classList.remove("button-blocked");
        });
    }

    return(
        <div className="lessons-inner-block lessons-inner-connect">
            <div className="lessons-inner-block-holder lessons-inner-connect-holder">
                <h3>{Language.inject(block.title)}</h3>

                <div className="lessons-inner-connect-button-holder">
                    <div className="lessons-inner-connect-button-holder-left">
                        {buttons.left.map((button, index) => {
                            return <button
                                ref={el => buttonElements.current.left[index] = el}
                                onClick={e => updateConnection(e.target, "left")}
                                key={index}
                            >{button}</button>
                        })}
                    </div>
                    
                    <div className="lessons-inner-connect-button-holder-right">
                        {buttons.right.map((button, index) => {
                            return <button
                                ref={el => buttonElements.current.right[index] = el}
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