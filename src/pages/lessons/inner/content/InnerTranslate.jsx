import React, { useState, useEffect, useRef } from "react";
import { images } from "../../../../data/images";
import { colors } from "../../../../data/colors";
import SpecialLetters from "../../../../components/SpecialLetters";
import BlockButton from "../../../../components/BlockButton";
import useContent from "../../../../hooks/useContent";
import useLock from "../../../../hooks/useLock";
import useAttempts from "../../../../hooks/useAttempts";
import checkAnswer from "../../../../functions/checkAnswer";
import { Language } from "../../../../functions/Language";
import handType from "../../../../functions/handType";
import { ExtendedArray } from "../../../../functions/ExtendedArray";

const InnerTranslate = ({ id, block, blockJump, lockSnapScroll }) => {
    const [textareaValue, setTextareaValue] = useState("");
    const [blockContinueFunction, setBlockContinueFunction] = useState(false);
    
    const textareaElement = useRef(null);
    const blockButton = useRef(null);
    
    const buttonContent = useContent("lessonsInner.button_translate_continue");
    const placeholderContent = useContent("lessonsInner.textarea_placeholder");
    
    const { lock } = useLock({ lockSnapScroll, blockId: id, locked: "down", blockButton: blockButton.current });
    const { noAttempts, newAttempt } = useAttempts(block);

    useEffect(() => {
        if(!blockContinueFunction && !noAttempts) textareaElement.current.style.border = "";

        else if(blockContinueFunction) setTimeout(() => {
            blockButton.current.classList.remove("button-disabled");
            setBlockContinueFunction(false);
        }, 2000);
    }, [blockContinueFunction]);

    useEffect(() => { if(noAttempts) typeAnswer() }, [noAttempts]);

    function continueFunctionEnter(e) {
        if(e.key !== "Enter") return;

        e.preventDefault();
        continueFunction();
    }

    function continueFunction() {
        if(blockContinueFunction) return;
        
        if(!textareaValue) return textareaElement.current.focus();
        const { isCorrect } = checkAnswer(block, textareaValue);

        if(isCorrect) {
            textareaElement.current.disabled = true;
            textareaElement.current.style.border = `3px solid ${colors.green}`;
            
            blockJump();
            lock(false);
        }
        
        else {
            textareaElement.current.style.border = `3px solid ${colors.red}`;
            blockButton.current.classList.add("button-disabled");
            
            newAttempt();
            setBlockContinueFunction(true);
        }
    }

    function typeAnswer() {
        textareaElement.current.value = "";

        handType({
            element: textareaElement.current,
            content: ExtendedArray.getRandom(Language.inject(block.answers)),
            isInput: true,

            onFinish: () => {
                setTextareaValue(textareaElement.current.value);
                lock(false);
            }
        });
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

                    <SpecialLetters
                        inputValue={textareaValue}
                        setInputValue={setTextareaValue}
                        isDisabled={noAttempts}
                    />
                </div>

                <BlockButton
                    ref={blockButton}
                    onClick={continueFunction}
                    content={buttonContent}
                    blockId={id}
                />
            </div>
        </div>
    );
}

export default InnerTranslate;