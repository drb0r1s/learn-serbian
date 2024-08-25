import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useContent from "../../../../hooks/useContent";
import { images } from "../../../../data/images";
import { Language } from "../../../../functions/Language";

const InnerConversation = ({ id, block, blockJump }) => {
    const lessonBlock = useSelector(state => state.lessons.lessonBlock);
    
    const noMessagesContent = useContent("lessonsInner.strong_conversation_no_messages");
    const buttonContent = useContent("lessonsInner.button_conversation_continue");

    const [startTyping, setStartTyping] = useState(false);
    const [currentMessage, setCurrentMessage] = useState(-1);

    const getRandomDelay = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    useEffect(() => {
        if(id === lessonBlock) setTimeout(() => { setStartTyping(true) }, getRandomDelay(1, 3) * 1000);
    }, [lessonBlock]);

    useEffect(() => { if(startTyping) sendMessage() }, [startTyping]);

    function sendMessage() {
        setStartTyping(false);

        setTimeout(() => {
            setCurrentMessage(prevCurrentMessage => prevCurrentMessage + 1)
        }, getRandomDelay(2, 5));
    }

    return(
        <div className="lessons-inner-block lessons-inner-conversation">
            <div className="lessons-inner-block-holder lessons-inner-conversation-holder">
                <h3>{Language.inject(block.title)}</h3>
                
                <div className="lessons-inner-conversation-display">
                    <div className="lessons-inner-conversation-display-user-holder">
                        <img src={images.noAvatar} alt={Language.inject(block.conversationWith)} />
                        <strong>{Language.inject(block.conversationWith)}</strong>
                    </div>

                    <div className={`lessons-inner-conversation-display-messages-holder ${currentMessage === -1 ? "lessons-inner-conversation-center" : ""}`}>
                        {currentMessage === -1 ? <strong className="lessons-inner-conversation-display-no-messages">{`${noMessagesContent} ${Language.inject(block.conversationWith)}.`}</strong> : <></>}
                        
                        {startTyping ? <div className="lessons-inner-conversation-display-typing">
                            <div className="lessons-inner-conversation-display-typing-dot" id="lessons-inner-conversation-display-typing-dot-1"></div>
                            <div className="lessons-inner-conversation-display-typing-dot" id="lessons-inner-conversation-display-typing-dot-2"></div>
                            <div className="lessons-inner-conversation-display-typing-dot" id="lessons-inner-conversation-display-typing-dot-3"></div>
                        </div> : <></>}
                    </div>

                    <div className="lessons-inner-conversation-display-keyboard-holder">
                        <input type="text" placeholder="" />
                        <button><img src={images.playIcon} alt="SEND" /></button>
                    </div>
                </div>
                
                <button className="disabled-button">{buttonContent}</button>
            </div>
        </div>
    );
}

export default InnerConversation;