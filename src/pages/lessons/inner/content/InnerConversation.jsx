import React from "react";
import useContent from "../../../../hooks/useContent";
import { images } from "../../../../data/images";

const InnerConversation = ({ block, blockJump }) => {
    const buttonContent = useContent("lessonsInner.button_conversation_continue");
    
    return(
        <div className="lessons-inner-block lessons-inner-conversation">
            <div className="lessons-inner-block-holder lessons-inner-conversation-holder">
                <h3>{block.title}</h3>
                
                <div className="lessons-inner-conversation-display">
                    <div className="lessons-inner-conversation-display-user-holder">
                        <img src={images.noAvatar} alt={block.conversationWith} />
                        <strong>{block.conversationWith}</strong>
                    </div>

                    <div className="lessons-inner-conversation-display-messages-holder">

                    </div>

                    <div className="lessons-inner-conversation-display-keyboard-holder">
                        
                    </div>
                </div>
                
                <button>{buttonContent}</button>
            </div>
        </div>
    );
}

export default InnerConversation;