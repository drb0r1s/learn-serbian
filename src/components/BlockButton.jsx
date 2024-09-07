import React, { useState, useEffect, forwardRef } from "react";
import { useSelector } from "react-redux";

const BlockButton = forwardRef(({ className, onClick, content, blockJump, blockId }, ref) => {
    const [isLocked, setIsLocked] = useState(false);
    const lessonsReducer = useSelector(state => state.lessons);

    useEffect(() => {
        if(blockId !== lessonsReducer.lessonBlock) return;

        const locked = lessonsReducer.activeLesson.content[lessonsReducer.lessonBlock].locked;
        setIsLocked(locked ? locked : false);
    }, [lessonsReducer.lessonBlock]);
    
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