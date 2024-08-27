import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import useContent from "../../../../hooks/useContent";
import useImage from "../../../../hooks/useImage";
import checkAnswer from "../../../../functions/checkAnswer";
import { images } from "../../../../data/images";
import { Language } from "../../../../functions/Language";

const InnerConversation = ({ id, block, blockJump }) => {
    const [isShown, setIsShown] = useState(false);
    const [startTyping, setStartTyping] = useState(false);
    const [currentMessage, setCurrentMessage] = useState(-1);
    const [conversation, setConversation] = useState([]);
    const [isKeyboardActive, setIsKeyboardActive] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const noMessagesElement = useRef(null);
    const typingMessageElement = useRef(null);
    const messageElements = useRef([]);
    const inputElement = useRef(null);

    const lessonBlock = useSelector(state => state.lessons.lessonBlock);
    
    const noMessagesContent = useContent("lessonsInner.strong_conversation_no_messages");
    const buttonContent = useContent("lessonsInner.button_conversation_continue");
    const placeholderContent = useContent("lessonsInner.input_conversation_wait_for_reply", { parameters: { name: block.conversationWith } });

    const avatar = useImage(block.avatar);

    const getRandomDelay = (min, max) => (Math.floor(Math.random() * (max - min + 1)) + min) * 1000;

    useEffect(() => {
        if(id === lessonBlock && !isShown) {
            setIsShown(true);
            setTimeout(() => { setStartTyping(true) }, getRandomDelay(1, 3));
        }
    }, [lessonBlock]);

    useEffect(() => {
        if(startTyping) setTimeout(() => {
            typingMessageElement.current.style.top = "95%";
            typingMessageElement.current.style.opacity = "1";

            setTimeout(() => { sendMessage() }, 300);
        }, 1);
    }, [startTyping]);

    useEffect(() => {
        if(currentMessage === -1) return;
        
        const message = {...block.questions[currentMessage], isUser: false};
        setConversation(prevConversation => [...prevConversation, message]);
    }, [currentMessage]);

    useEffect(() => {
        if(!conversation.length) return;
        
        const lastMessage = messageElements.current[messageElements.current.length - 1];

        setTimeout(() => {
            lastMessage.style.top = "0";
            lastMessage.style.opacity = "1";
        }, 100);
    }, [conversation]);

    function sendMessage() {
        setTimeout(() => {
            noMessagesElement.current.style.opacity = "0";

            typingMessageElement.current.style.top = "";
            typingMessageElement.current.style.opacity = "";

            setTimeout(() => {
                setStartTyping(false);
                setCurrentMessage(prevCurrentMessage => prevCurrentMessage + 1)
                setIsKeyboardActive(true);
            }, 300);
        }, getRandomDelay(2, 5));
    }

    function sendUserMessage() {
        if(!inputValue) return inputElement.current.focus();

        const { isCorrect } = checkAnswer(block, inputValue, block.questions[currentMessage].answers);

        const message = { content: inputValue, isUser: true };
        setConversation(prevConversation => [...prevConversation, message]);

        setIsKeyboardActive(false);
        setInputValue("");

        inputElement.current.placeholder = placeholderContent;

        if(isCorrect) alert("Correct");
        else alert("Incorrect");
    }

    return(
        <div className="lessons-inner-block lessons-inner-conversation">
            <div className="lessons-inner-block-holder lessons-inner-conversation-holder">
                <h3>{Language.inject(block.title)}</h3>
                
                <div className="lessons-inner-conversation-display">
                    <div className="lessons-inner-conversation-display-user-holder">
                        <img src={avatar} alt={Language.inject(block.conversationWith)} />
                        <strong>{Language.inject(block.conversationWith)}</strong>
                    </div>

                    <div className={`lessons-inner-conversation-display-messages-holder ${currentMessage > -1 ? "lessons-inner-conversation-display-messages-holder-active" : ""}`}>
                        {currentMessage === -1 ? <strong className="lessons-inner-conversation-display-no-messages" ref={noMessagesElement}>{`${noMessagesContent} ${Language.inject(block.conversationWith)}.`}</strong> : <></>}
                        
                        {startTyping ? <div className="lessons-inner-conversation-display-typing" ref={typingMessageElement}>
                            <img src={avatar} alt={block.conversationWith} />
                            
                            <div className="lessons-inner-conversation-display-typing-dot-holder">
                                <div className="lessons-inner-conversation-display-typing-dot" id="lessons-inner-conversation-display-typing-dot-1"></div>
                                <div className="lessons-inner-conversation-display-typing-dot" id="lessons-inner-conversation-display-typing-dot-2"></div>
                                <div className="lessons-inner-conversation-display-typing-dot" id="lessons-inner-conversation-display-typing-dot-3"></div>
                            </div>
                        </div> : <></>}

                        {conversation.map((message, index) => {
                            return <div
                                className={`lessons-inner-conversation-display-message lessons-inner-conversation-display-message-${message.isUser ? "user" : "participant"}`}
                                ref={el => messageElements.current[index] = el}
                                key={index}
                            >
                                {!message.isUser ? <img src={avatar} alt={block.conversationWith} /> : <></>}
                                <p>{message.content}</p>
                            </div>
                        })}
                    </div>

                    <div className={`lessons-inner-conversation-display-keyboard-holder ${isKeyboardActive ? "lessons-inner-conversation-display-keyboard-holder-active" : ""}`}>
                        <input
                            type="text"
                            placeholder={currentMessage > -1 ? block.questions[currentMessage].translation : ""}
                            disabled={!isKeyboardActive}
                            ref={inputElement}
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                            onKeyDown={e => { if(e.key === "Enter") sendUserMessage() }}
                        />
                        
                        <button onClick={sendUserMessage}><img src={images.sendIcon} alt="SEND" /></button>
                    </div>
                </div>
                
                <button className="disabled-button">{buttonContent}</button>
            </div>
        </div>
    );
}

export default InnerConversation;