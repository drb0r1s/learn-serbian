import React, { useState, useEffect, useRef } from "react";
import BlockButton from "../../../../components/BlockButton";
import useContent from "../../../../hooks/useContent";
import useAttempts from "../../../../hooks/useAttempts";
import checkAnswer from "../../../../functions/checkAnswer";
import { ExtendedArray } from "../../../../functions/ExtendedArray";
import { Language } from "../../../../functions/Language";

const InnerConnect = ({ id, block, blockJump }) => {
    const [buttons, setButtons] = useState({ left: [], right: [] });
    const [defaultButtons, setDefaultButtons] = useState({ left: [], right: [] });
    const [correctButtons, setCorrectButtons] = useState({ left: [], right: [] });
    const [activeButtons, setActiveButtons] = useState({ left: null, right: null });

    const buttonElements = useRef({ left: [], right: [] })

    const buttonContent = useContent("lessonsInner.button_connect_continue");
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
    useEffect(() => { if(noAttempts) connectionsPositionAnimation() }, [buttons]);

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
        
            setCorrectButtons(prevCorrectButtons => { return {
                left: [...prevCorrectButtons.left, activeButtons.left.innerText],
                right: [...prevCorrectButtons.right, activeButtons.right.innerText] 
            }});

            setActiveButtons({ left: null, right: null });
        }

        else {
            blockButtons(true);
            
            activeButtons.left.classList.remove("button-active");
            activeButtons.right.classList.remove("button-active");
            
            activeButtons.left.classList.add("button-incorrect", "button-invalid");
            activeButtons.right.classList.add("button-incorrect", "button-invalid");
        
            setTimeout(() => {
                activeButtons.left.classList.remove("button-incorrect", "button-invalid");
                activeButtons.right.classList.remove("button-incorrect", "button-invalid");
            
                setActiveButtons({ left: null, right: null });
                blockButtons(false);
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

        setDefaultButtons(buttons);
        setButtons({ left: correctLeft, right: correctRight });
    }

    function connectionsPositionAnimation() {
        setTimeout(() => {
            blockButtons(true);
            findCorrectButtons();
        }, 600);

        const buttonHeight = parseInt(getComputedStyle(buttonElements.current.left[0]).getPropertyValue("height"));

        buttonElements.current.left.forEach((buttonLeft, index) => { positionRow("left", buttonLeft, index) });
        buttonElements.current.right.forEach((buttonRight, index) => { positionRow("right", buttonRight, index) });

        setTimeout(() => {
            buttonElements.current.left.forEach(buttonLeft => { buttonLeft.style.top = "0" });
            buttonElements.current.right.forEach(buttonRight => { buttonRight.style.top = "0" });
        }, 300);
        
        function positionRow(side, button, index) {
            const defaultButtonsSide = side === "left" ? defaultButtons.left : defaultButtons.right;

            let defaultIndex;
            for(let i = 0; i < defaultButtonsSide.length; i++) if(button.innerText === defaultButtonsSide[i]) defaultIndex = i;
            
            let movement;

            if(index === defaultIndex) movement = 0;
            else if(index > defaultIndex) movement = (index - defaultIndex) * -1;
            else movement = defaultIndex - index;

            button.style.top = `${(buttonHeight + 10) * movement}px`;
        }
    }

    function blockButtons(block) {
        buttonElements.current.left.forEach(buttonLeft => {
            if(block) buttonLeft.classList.add("button-blocked");
            else buttonLeft.classList.remove("button-blocked");
        });

        buttonElements.current.right.forEach(buttonRight => {
            if(block) buttonRight.classList.add("button-blocked");
            else buttonRight.classList.remove("button-blocked");
        });
    }

    function findCorrectButtons() {
        buttonElements.current.left.forEach(buttonLeft => { updateButton("left", buttonLeft) });
        buttonElements.current.right.forEach(buttonRight => { updateButton("right", buttonRight) });

        function updateButton(side, button) {
            const correctButtonsSide = side === "left" ? correctButtons.left : correctButtons.right;
            
            if(button.classList.contains("button-correct")) button.classList.remove("button-correct");

            for(let i = 0; i < correctButtonsSide.length; i++) {
                if(button.innerText === correctButtonsSide[i]) button.classList.add("button-correct");
            }
        }
    }

    return(
        <div className="lessons-inner-block lessons-inner-connect">
            <div className="lessons-inner-block-holder lessons-inner-connect-holder">
                <h3>{Language.inject(block.title)}</h3>

                <div className="lessons-inner-connect-button-holder">
                    <div className="lessons-inner-connect-button-holder-left">
                        {buttons.left.map((button, index) => {
                            return <button
                                id={`lessons-inner-connect-button-left-${index}`}
                                ref={el => buttonElements.current.left[index] = el}
                                onClick={e => updateConnection(e.target, "left")}
                                key={index}
                            >{button}</button>
                        })}
                    </div>
                    
                    <div className="lessons-inner-connect-button-holder-right">
                        {buttons.right.map((button, index) => {
                            return <button
                                id={`lessons-inner-connect-button-right-${index}`}
                                ref={el => buttonElements.current.right[index] = el}
                                onClick={e => updateConnection(e.target, "right")}
                                key={index}
                            >{button}</button>
                        })}
                    </div>
                </div>

                <BlockButton
                    content={buttonContent}
                    blockJump={blockJump}
                    blockId={id}
                />
            </div>
        </div>
    );
}

export default InnerConnect;