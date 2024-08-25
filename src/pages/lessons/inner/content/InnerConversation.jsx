import React, { useState, useEffect, useRef } from "react";
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

    const noMessagesElement = useRef(null);
    const typingMessageElement = useRef(null);

    const getRandomDelay = (min, max) => (Math.floor(Math.random() * (max - min + 1)) + min) * 1000;

    useEffect(() => {
        if(id === lessonBlock) setTimeout(() => { setStartTyping(true) }, getRandomDelay(1, 3));
    }, [lessonBlock]);

    useEffect(() => {
        if(startTyping) setTimeout(() => {
            typingMessageElement.current.style.top = "95%";
            typingMessageElement.current.style.opacity = "1";

            setTimeout(() => { sendMessage() }, 300);
        }, 1);
    }, [startTyping]);

    function sendMessage() {
        setTimeout(() => {
            noMessagesElement.current.style.opacity = "0";

            typingMessageElement.current.style.top = "";
            typingMessageElement.current.style.opacity = "";

            setTimeout(() => {
                setStartTyping(false);
                setCurrentMessage(prevCurrentMessage => prevCurrentMessage + 1)
            }, 300);
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
                        {currentMessage === -1 ? <strong className="lessons-inner-conversation-display-no-messages" ref={noMessagesElement}>{`${noMessagesContent} ${Language.inject(block.conversationWith)}.`}</strong> : <></>}
                        
                        {startTyping ? <div className="lessons-inner-conversation-display-typing" ref={typingMessageElement}>
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