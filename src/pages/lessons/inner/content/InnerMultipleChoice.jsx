import React from "react";
import useImage from "../../../../hooks/useImage";
import { ArrayFunctions } from "../../../../functions/ArrayFunctions";
import checkAnswer from "../../../../functions/checkAnswer";
import { Language } from "../../../../functions/Language";

const InnerMultipleChoice = ({ block, blockJump }) => {
    const image = useImage(block.image);
    const blockQuestions = block.randomize ? ArrayFunctions.randomize(block.questions, true) : block.questions;
    
    function buttonFunction(question, index) {
        const { isCorrect } = checkAnswer(block, block.randomize ? question.index + 1 : index + 1)
    
        if(isCorrect) alert("Correct!");
        else alert("Incorrect!");
    }
    
    return(
        <div className="lessons-inner-block lessons-inner-multiple-choice">
            <div className="lessons-inner-block-holder lessons-inner-multiple-choice-holder">
                <h3>{Language.inject(block.title)}</h3>
                <p>{Language.inject(block.description)}</p>

                <div className="lessons-inner-multiple-choice-questions-holder">
                    {blockQuestions.map((question, index) => {
                        return <button
                            onClick={() => buttonFunction(question, index)}
                            key={index}
                        >{Language.inject(block.randomize ? question.element : question)}</button>
                    })}
                </div>

                <button>Continue</button>
            </div>

            <img src={image} alt="IMAGE" />
        </div>
    );
}

export default InnerMultipleChoice;