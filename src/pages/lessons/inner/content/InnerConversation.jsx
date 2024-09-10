import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import BlockButton from "../../../../components/BlockButton";
import useContent from "../../../../hooks/useContent";
import useAttempts from "../../../../hooks/useAttempts";
import useImage from "../../../../hooks/useImage";
import checkAnswer from "../../../../functions/checkAnswer";
import handType from "../../../../functions/handType";
import { images } from "../../../../data/images";
import { colors } from "../../../../data/colors";
import { Language } from "../../../../functions/Language";
import { ExtendedMath } from "../../../../functions/ExtendedMath";
import { ExtendedArray } from "../../../../functions/ExtendedArray";

const InnerConversation = ({ id, block, blockJump }) => {
    const [isShown, setIsShown] = useState(false);
    const [typing, setTyping] = useState({ user: false, participant: false });
    const [currentMessage, setCurrentMessage] = useState(-1);
    const [conversation, setConversation] = useState([]);
    const [isKeyboardActive, setIsKeyboardActive] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(true);

    const conversationDisplay = useRef(null);
    const noMessagesElement = useRef(null);
    const messageElements = useRef([]);
    const messageInfo = useRef(null);
    const inputElement = useRef(null);

    const lessonBlock = useSelector(state => state.lessons.lessonBlock);
    
    const noMessagesContent = useContent("lessonsInner.strong_conversation_no_messages");
    const buttonContent = useContent("lessonsInner.button_conversation_continue");
    const messageInfoContent = useContent("lessonsInner.p_conversation_typing", { parameters: { name: block.conversationWith } });
    const placeholderContent = useContent("lessonsInner.input_conversation_wait_for_reply", { parameters: { name: block.conversationWith } });

    const avatar = useImage(block.avatar);
    const { noAttempts, newAttempt } = useAttempts(block);

    const incorrectAnswerMessages = [
        "O čemu ti?",
        "Šta?",
        "Ne razumem.",
        "Molim?",
        "Kako to misliš?"
    ];

    useEffect(() => {
        if(id === lessonBlock && !isShown) {
            setIsShown(true);
            enableTyping("participant");
        }
    }, [lessonBlock]);

    useEffect(() => {
        if(typing.user || typing.participant) setTimeout(() => {
            messageInfo.current.style.opacity = "1";
            messageInfo.current.style.top = "100%";

            if(typing.participant) setTimeout(() => { sendMessage() }, 300);
        }, 1);
    }, [typing.user, typing.participant]);

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

            if(conversation.length > 2) colorUserMessage();
        }, 100);
    }, [conversation]);

    useEffect(() => {
        if(isKeyboardActive && (id === lessonBlock)) inputElement.current.focus()
    }, [isKeyboardActive]);

    useEffect(() => { if(noAttempts) finishConversation(false) }, [noAttempts]);

    function enableTyping(key) {        
        setTimeout(() => { setTyping(prevTyping => { return {...prevTyping, [key]: true} }) }, ExtendedMath.random(1, 3) * 1000);
    }

    function disableTyping(key) {
        messageInfo.current.style.opacity = "";
        messageInfo.current.style.top = "";

        setTimeout(() => { setTyping(prevTyping => { return {...prevTyping, [key]: false} }) }, 300);
    }

    function sendMessage() {
        setTimeout(() => {
            if(noMessagesElement.current) noMessagesElement.current.style.opacity = "0";

            messageInfo.current.style.opacity = "";
            messageInfo.current.style.top = "";

            setTimeout(() => {
                setTyping(prevTyping => { return {...prevTyping, participant: false} });
                setIsKeyboardActive(true);

                if(isAnswerCorrect) {
                    if(currentMessage + 1 === block.questions.length) return finishConversation(true);
                    
                    setCurrentMessage(prevCurrentMessage => prevCurrentMessage + 1);
                    inputElement.current.placeholder = block.questions[currentMessage + 1].translation;
                }
                
                else {
                    const message = {
                        content: ExtendedArray.getRandom(incorrectAnswerMessages),
                        isUser: false
                    };

                    setConversation(prevConversation => [...prevConversation, message]);
                    inputElement.current.placeholder = block.questions[currentMessage].translation;
                
                    newAttempt();
                }
            }, 300);
        }, ExtendedMath.random(2, 5) * 1000);
    }

    function sendUserMessage() {
        if(!inputValue) return inputElement.current.focus();

        const { isCorrect } = checkAnswer(block, inputValue, block.questions[currentMessage].answers);
        setIsAnswerCorrect(isCorrect);

        const message = { content: inputValue, isUser: true };
        setConversation(prevConversation => [...prevConversation, message]);

        setIsKeyboardActive(false);
        setInputValue("");

        inputElement.current.placeholder = placeholderContent;

        enableTyping("participant");
    }

    function sendUserMessageEnter(e) {
        if(e.key !== "Enter") return;

        sendUserMessage();
        disableTyping("user");
    }

    function sendLastMessage() {
        const message = { content: inputElement.current.value, isUser: true };
        setConversation(prevConversation => [...prevConversation, message]);
    }

    function finishConversation(isSuccessful) {
        conversationDisplay.current.style.border = `3px solid ${isSuccessful ? colors.green : colors.red}`;
        inputElement.current.placeholder = "";
        
        setIsKeyboardActive(false);

        if(isSuccessful) {

        }
        
        else setTimeout(() => {
            handType({
                element: inputElement.current,
                content: ExtendedArray.getRandom(block.questions[currentMessage].answers),
                isInput: true,
                onFinish: sendLastMessage
            });
        }, 300);
    }

    function updateInputValue(e) {
        if(e.target.value) setTyping(prevTyping => { return {...prevTyping, user: true} });
        else disableTyping("user");
        
        setInputValue(e.target.value);
    }

    function colorUserMessage() {
        const lastUserMessage = messageElements.current[messageElements.current.length - 2];
        const lastUserMessageP = lastUserMessage.firstChild;

        lastUserMessageP.style.border = `2px solid ${isAnswerCorrect ? colors.green : colors.red}`;
        setTimeout(() => { lastUserMessageP.style.border = "" }, 900);
    }

    return(
        <div className="lessons-inner-block lessons-inner-conversation">
            <div className="lessons-inner-block-holder lessons-inner-conversation-holder">
                <h3>{Language.inject(block.title)}</h3>
                
                <div className="lessons-inner-conversation-display" ref={conversationDisplay}>
                    <div className="lessons-inner-conversation-display-user-holder">
                        <img src={avatar} alt={Language.inject(block.conversationWith)} />
                        <strong>{Language.inject(block.conversationWith)}</strong>
                    </div>

                    <div className={`lessons-inner-conversation-display-messages-holder ${currentMessage > -1 ? "lessons-inner-conversation-display-messages-holder-active" : ""}`}>
                        {currentMessage === -1 ? <strong className="lessons-inner-conversation-display-no-messages" ref={noMessagesElement}>{`${noMessagesContent} ${Language.inject(block.conversationWith)}.`}</strong> : <></>}
                        
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

                        {typing.user || typing.participant ? <p
                            className="lessons-inner-conversation-display-message-info"
                            ref={messageInfo}
                        >
                            {typing.user ? block.questions[currentMessage].translation : messageInfoContent}
                        </p> : <></>}
                    </div>

                    <div className={`lessons-inner-conversation-display-keyboard-holder ${isKeyboardActive ? "lessons-inner-conversation-display-keyboard-holder-active" : ""}`}>
                        <input
                            type="text"
                            placeholder={currentMessage > -1 ? block.questions[currentMessage].translation : ""}
                            disabled={!isKeyboardActive}
                            ref={inputElement}
                            value={inputValue}
                            onChange={updateInputValue}
                            onKeyDown={sendUserMessageEnter}
                        />
                        
                        <button onClick={sendUserMessage}><img src={images.sendIcon} alt="SEND" /></button>
                    </div>
                </div>
                
                <BlockButton
                    className="disabled-button"
                    content={buttonContent}
                    blockJump={blockJump}
                    blockId={id}
                />
            </div>
        </div>
    );
}

export default InnerConversation;