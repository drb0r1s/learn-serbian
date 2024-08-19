import React, { useState, useRef } from "react";
import { images } from "../../../../data/images";
import useContent from "../../../../hooks/useContent";
import useCaseSensitive from "../../../../hooks/useCaseSensitive";
import checkAnswer from "../../../../functions/checkAnswer";
import { Language } from "../../../../functions/Language";

const InnerTranslate = ({ block, blockJump }) => {
    const [textareaValue, setTextareaValue] = useState("");
    const textareaElement = useRef(null);
    
    const buttonContent = useContent("lessonsInner.button_translate_continue");
    const placeholderContent = useContent("lessonsInner.textarea_placeholder");
    
    const specialLetters = useCaseSensitive(["č", "ć", "š", "đ", "ž"], textareaValue);

    function continueFunction() {
        if(!textareaValue) return textareaElement.current.focus();
        const { isCorrect } = checkAnswer(block, textareaValue);

        if(isCorrect) alert("Correct!");
        else alert("Incorrect!");
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
                        onChange={e => setTextareaValue(e.target.value)}
                        ref={textareaElement}
                    ></textarea>

                    <div className="lessons-inner-translate-letters-holder">
                        {specialLetters.map((specialLetter, index) => {
                            return <button key={index}>{specialLetter}</button>
                        })}
                    </div>
                </div>

                <button onClick={continueFunction}>{buttonContent}</button>
            </div>
        </div>
    );
}

export default InnerTranslate;