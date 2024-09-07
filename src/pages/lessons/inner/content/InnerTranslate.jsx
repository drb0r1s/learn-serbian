import React, { useState, useEffect, useRef } from "react";
import { images } from "../../../../data/images";
import { colors } from "../../../../data/colors";
import BlockButton from "../../../../components/BlockButton";
import useContent from "../../../../hooks/useContent";
import useCaseSensitive from "../../../../hooks/useCaseSensitive";
import useAttempts from "../../../../hooks/useAttempts";
import checkAnswer from "../../../../functions/checkAnswer";
import { Language } from "../../../../functions/Language";
import buttonTimer from "../../../../functions/buttonTimer";
import handType from "../../../../functions/handType";
import { ExtendedArray } from "../../../../functions/ExtendedArray";

const InnerTranslate = ({ block, blockJump }) => {
    const [textareaValue, setTextareaValue] = useState("");
    
    const textareaElement = useRef(null);
    const continueButton = useRef(null);
    
    const buttonContent = useContent("lessonsInner.button_translate_continue");
    const placeholderContent = useContent("lessonsInner.textarea_placeholder");
    
    const specialLetters = useCaseSensitive(["č", "ć", "š", "đ", "ž"], textareaValue);
    const { noAttempts, newAttempt } = useAttempts(block);

    useEffect(() => { if(noAttempts) typeAnswer() }, [noAttempts]);

    function continueFunctionEnter(e) {
        if(e.key !== "Enter") return;

        e.preventDefault();
        continueFunction();
    }

    function continueFunction() {
        if(continueButton.current.classList.contains("button-disabled")) return;
        
        if(!textareaValue) return textareaElement.current.focus();
        const { isCorrect } = checkAnswer(block, textareaValue);

        if(isCorrect) {
            textareaElement.current.disabled = true;
            textareaElement.current.style.border = `3px solid ${colors.green}`;
            
            blockJump();
        }
        
        else {
            textareaElement.current.style.border = `3px solid ${colors.red}`;
            continueButton.current.classList.add("button-disabled");
            
            const delay = block.incorrectDelay ? block.incorrectDelay : 5;
            
            buttonTimer(continueButton.current, delay, () => {
                textareaElement.current.style.border = "";
                continueButton.current.classList.remove("button-disabled");
            });

            newAttempt();
        }
    }

    function typeAnswer() {
        textareaElement.current.value = "";
        handType(textareaElement.current, ExtendedArray.getRandom(Language.inject(block.answers)), true);
    }
    
    return(
        <div className="lessons-inner-block lessons-inner-translate">
            <div className="lessons-inner-block-holder lessons-inner-translate-holder">
                <h3>{Language.inject(block.title)}</h3>

                <div className="lessons-inner-translate-description-holder">
                    <span><img src={images.playIcon} alt="PLAY" /></span>
                    <p>{Language.inject(block.description)}</p>
                </div>

                <div className="lessons-inner-translate-textarea-holder">
                    <textarea
                        rows="10"
                        placeholder={placeholderContent}
                        value={textareaValue}
                        disabled={noAttempts}
                        ref={textareaElement}
                        onChange={e => setTextareaValue(e.target.value)}
                        onKeyDown={continueFunctionEnter}
                    ></textarea>

                    <div className="lessons-inner-translate-letters-holder">
                        {specialLetters.map((specialLetter, index) => {
                            return <button key={index}>{specialLetter}</button>
                        })}
                    </div>
                </div>

                <BlockButton
                    ref={continueButton}
                    onClick={continueFunction}
                    content={buttonContent}
                />
            </div>
        </div>
    );
}

export default InnerTranslate;