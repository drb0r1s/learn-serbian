import React, { useState, useRef } from "react";
import { images } from "../../../../data/images";
import useContent from "../../../../hooks/useContent";
import checkAnswer from "../../../../functions/checkAnswer";

const InnerTranslate = ({ block, blockJump }) => {
    const [textareaValue, setTextareaValue] = useState("");
    const textareaElement = useRef(null);
    
    const placeholderContent = useContent("lessonsInner.textarea_placeholder");
    const specialLetters = ["č", "ć", "š", "đ", "ž"];

    function continueFunction() {
        if(!textareaValue) return textareaElement.current.focus();
        const { isCorrect } = checkAnswer(block, textareaValue);

        if(isCorrect) alert("Correct!");
        else alert("Incorrect!");
    }
    
    return(
        <div className="lessons-inner-block lessons-inner-translate">
            <div className="lessons-inner-block-holder lessons-inner-translate-holder">
                <h3>{block.title}</h3>

                <div className="lessons-inner-translate-description-holder">
                    <span><img src={images.playIcon} alt="PLAY" /></span>
                    <p>{block.description}</p>
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
                            return <button
                                key={index}
                            >{textareaValue ? specialLetter : specialLetter.toUpperCase()}</button>
                        })}
                    </div>
                </div>

                <button onClick={continueFunction}>Continue</button>
            </div>
        </div>
    );
}

export default InnerTranslate;