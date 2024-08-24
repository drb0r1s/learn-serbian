import React from "react";
import useContent from "../../../../hooks/useContent";
import { Language } from "../../../../functions/Language";

const InnerEnd = ({ block, stopLesson }) => {
    const buttonContent = useContent("lessonsInner.button_end_exit");
    
    return(
        <div className="lessons-inner-block lessons-inner-end ">
            <div className="lessons-inner-block-holder lessons-inner-end-holder">
                <h3>{Language.inject(block.title)}</h3>
                <p>{Language.inject(block.description)}</p>

                <button onClick={stopLesson}>{buttonContent}</button>
            </div>
        </div>
    );
}

export default InnerEnd;