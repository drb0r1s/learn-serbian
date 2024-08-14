import React from "react";
import useImage from "../../../../hooks/useImage";

const InnerMultipleChoice = ({ block, blockJump }) => {
    const image = useImage(block.image);
    
    return(
        <div className="lessons-inner-multiple-choice">
            <div className="lessons-inner-multiple-choice-holder">
                <h3>{block.title}</h3>
                <p>{block.description}</p>

                <div className="lessons-inner-multiple-choice-questions-holder">
                    {block.questions.map((question, index) => {
                        return <button key={index}>{question}</button>
                    })}
                </div>

                <button>Continue</button>
            </div>

            <img src={image} alt="IMAGE" />
        </div>
    );
}

export default InnerMultipleChoice;