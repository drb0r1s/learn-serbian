import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { lessonsActions } from "../../../state/reducers/lessonsSlice";
import InnerHeader from "./InnerHeader";
import InnerDefault from "./content/InnerDefault";
import InnerMultipleChoice from "./content/InnerMultipleChoice";
import InnerTranslate from "./content/InnerTranslate";
import InnerConversation from "./content/InnerConversation";
import InnerConnect from "./content/InnerConnect";
import InnerEnd from "./content/InnerEnd";
import useSnapScroll from "../../../hooks/useSnapScroll";
import { ProgressBar } from "../../../functions/ProgressBar";
import { ExtendedMath } from "../../../functions/ExtendedMath";

const Inner = () => {
    const lessonsReducer = useSelector(state => state.lessons);
    const dispatch = useDispatch();

    const [innerElement, setInnerElement] = useState(null);
    const [innerHeaderHeight, setInnerHeaderHeight] = useState(0);

    const inner = useRef(null);
    const innerHeader = useRef(null);
    const progressBar = useRef(null);

    const progressBarMovement = ExtendedMath.upperRound(100 / lessonsReducer.activeLesson.content.length);

    useEffect(() => {
        setInnerElement(inner.current);

        const height = parseInt(getComputedStyle(innerHeader.current).getPropertyValue("height"));
        const paddingY = parseInt(getComputedStyle(innerHeader.current).getPropertyValue("padding"));

        setInnerHeaderHeight(height + paddingY * 2);
            
        ProgressBar.update(progressBar.current, progressBarMovement);
        ProgressBar.update(progressBar.current, progressBarMovement, true);
    }, []);

    const { externalSnapScroll: blockJump, blockSnapScroll } = useSnapScroll({
        element: innerElement,
        additionalMovement: innerHeaderHeight * -1,
        blocked: lessonsReducer.activeLesson.content[0].locked,
        
        onScroll: direction => {
            const followingLessonBlock = lessonsReducer.activeLesson.content[lessonsReducer.lessonBlock + (direction === "up" ? -1 : 1)];
            blockSnapScroll(followingLessonBlock.locked ? followingLessonBlock.locked : false);
            
            if(direction === "up") {
                dispatch(lessonsActions.updateLessonBlock(-1));
                ProgressBar.update(progressBar.current, progressBarMovement * -1);
            }

            else {
                dispatch(lessonsActions.updateLessonBlock(1));

                const progressBarWidth = ProgressBar.update(progressBar.current, progressBarMovement);
                const progressBarHelperWidth = ProgressBar.width.helper;
                
                if(progressBarWidth > progressBarHelperWidth) ProgressBar.update(progressBar.current, progressBarMovement, true);
            }
        }
    });

    function stopLesson() {
        inner.current.style.top = "";
        setTimeout(() => { dispatch(lessonsActions.updateInLesson(false)) }, 500);
    }

    return(
        <div className="lessons-inner" ref={inner}>
            <InnerHeader
                inner={inner}
                innerHeader={innerHeader}
                stopLesson={stopLesson}
                progressBar={progressBar}
            />

            <div className="lessons-inner-lesson">
                {lessonsReducer.activeLesson.content.map((block, index) => {
                    switch(block.type) {
                        case "default": return <InnerDefault
                            id={index}
                            block={block}
                            blockJump={() => blockJump(inner.current, "down")}
                            key={index}
                        />
                        case "multipleChoice": return <InnerMultipleChoice
                            id={index}
                            block={block}
                            blockJump={() => blockJump(inner.current, "down")}
                            key={index}
                        />
                        case "translate": return <InnerTranslate
                            id={index}
                            block={block}
                            blockJump={() => blockJump(inner.current, "down")}
                            key={index}
                        />
                        case "conversation": return <InnerConversation
                            id={index}
                            block={block}
                            blockJump={() => blockJump(inner.current, "down")}
                            key={index}
                        />
                        case "connect": return <InnerConnect
                            id={index}
                            block={block}
                            blockJump={() => blockJump(inner.current, "down")}
                            key={index}
                        />
                        case "end": return <InnerEnd
                            id={index}
                            block={block}
                            stopLesson={stopLesson}
                            key={index}
                        />
                        default:
                    }
                })}
            </div>
        </div>
    );
}

export default Inner;