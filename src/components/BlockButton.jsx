import React, { forwardRef } from "react";
import { useSelector } from "react-redux";

const BlockButton = forwardRef(({ className, onClick, content, blockJump }, ref) => {
    const lessonsReducer = useSelector(state => state.lessons);
    const isLocked = lessonsReducer.activeLesson.content[lessonsReducer.lessonBlock].locked;

    return(
        <button
            className={`${className} ${isLocked ? "button-locked" : ""}`}
            disabled={isLocked}
            ref={ref}
            onClick={onClick ? onClick : blockJump}
        >{content}</button>
    );
})

export default BlockButton;