import React, { useState, useEffect, useRef } from "react";
import BlockButton from "../../../../components/BlockButton";
import useContent from "../../../../hooks/useContent";
import useImage from "../../../../hooks/useImage";
import useAttempts from "../../../../hooks/useAttempts";
import { ExtendedArray } from "../../../../functions/ExtendedArray";
import checkAnswer from "../../../../functions/checkAnswer";
import { Language } from "../../../../functions/Language";
import buttonTimer from "../../../../functions/buttonTimer";

const InnerMultipleChoice = ({ block, blockJump }) => {
    const buttonContent = useContent("lessonsInner.button_multiple_choice_continue");
    const image = useImage(block.image);
    
    const { noAttempts, newAttempt } = useAttempts(block);

    const languageBlockQuestions = Language.inject(block.questions);
    
    const [blockQuestions, setBlockQuestions] = useState([]);

    const buttonElements = useRef([]);
    const continueButton = useRef(null);

    useEffect(() => {
        setBlockQuestions(block.randomize ? ExtendedArray.randomize(languageBlockQuestions, true) : languageBlockQuestions);
    }, []);
    
    function questionButtonFunction(button, question, index) {
        if(button.classList.contains("button-neutral")) return;

        const { isCorrect } = checkAnswer(block, block.randomize ? question.index + 1 : index + 1)
        const correctButton = buttonElements.current[block.answer - 1];

        buttonElements.current.forEach(buttonElement => { buttonElement.classList.add("button-neutral"); });
        
        if(isCorrect || noAttempts) {
            correctButton.classList.add("button-correct");
            if(!isCorrect) button.classList.add("button-wrong");

            continueButton.current.classList.remove("button-disabled");
        }
        
        else {
            button.classList.add("button-wrong");
            const delay = block.incorrectDelay ? block.incorrectDelay : 5;
            
            buttonTimer(continueButton.current, delay, () => {
                buttonElements.current.forEach(buttonElement => { buttonElement.classList.remove("button-neutral") });
                button.classList.remove("button-wrong");
            });

            newAttempt();
        }
    }

    function continueButtonFunction(e) {
        if(e.target.classList.contains("button-disabled")) return;
        blockJump();
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
                            onClick={e => questionButtonFunction(e.target, question, index)}
                            key={index}
                        >{block.randomize ? question.element : question}</button>
                    })}
                </div>

                <BlockButton
                    className="button-disabled"
                    content={buttonContent}
                    ref={continueButton}
                    onClick={continueButtonFunction}
                />
            </div>

            <img src={image} alt="IMAGE" />
        </div>
    );
}

export default InnerMultipleChoice;