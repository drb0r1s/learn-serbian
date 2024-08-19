import React, { useRef } from "react";
import useContent from "../../../../hooks/useContent";
import useImage from "../../../../hooks/useImage";
import { ArrayFunctions } from "../../../../functions/ArrayFunctions";
import checkAnswer from "../../../../functions/checkAnswer";
import { Language } from "../../../../functions/Language";

const InnerMultipleChoice = ({ block, blockJump }) => {
    const buttonContent = useContent("lessonsInner.button_multiple_choice_continue");
    const image = useImage(block.image);

    const blockQuestions = block.randomize ? ArrayFunctions.randomize(block.questions, true) : block.questions;
    const buttonElements = useRef([]);
    
    function buttonFunction(button, question, index) {
        const { isCorrect } = checkAnswer(block, block.randomize ? question.index + 1 : index + 1)
        const correctButton = buttonElements.current[block.answer - 1];

        buttonElements.current.forEach(buttonElement => { buttonElement.classList.add("button-neutral"); });
        correctButton.classList.add("button-correct");

        if(isCorrect) alert("Correct!");
        
        else {
            button.classList.add("button-wrong");
        }
    }
    
    return(
        <div className="lessons-inner-block lessons-inner-multiple-choice">
            <div className="lessons-inner-block-holder lessons-inner-multiple-choice-holder">
                <h3>{Language.inject(block.title)}</h3>
                <p>{Language.inject(block.description)}</p>

                <div className="lessons-inner-multiple-choice-questions-holder">
                    {blockQuestions.map((question, index) => {
                        return <button
                            ref={el => buttonElements.current[question.index] = el}
                            onClick={e => buttonFunction(e.target, question, index)}
                            key={index}
                        >{Language.inject(block.randomize ? question.element : question)}</button>
                    })}
                </div>

                <button>{buttonContent}</button>
            </div>

            <img src={image} alt="IMAGE" />
        </div>
    );
}

export default InnerMultipleChoice;