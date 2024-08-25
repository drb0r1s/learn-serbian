import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { lessonsActions } from "../../../state/reducers/lessonsSlice";
import InnerHeader from "./InnerHeader";
import InnerDefault from "./content/InnerDefault";
import InnerMultipleChoice from "./content/InnerMultipleChoice";
import InnerTranslate from "./content/InnerTranslate";
import InnerConversation from "./content/InnerConversation";
import InnerEnd from "./content/InnerEnd";
import useSnapScroll from "../../../hooks/useSnapScroll";

const Inner = () => {
    const lessonsReducer = useSelector(state => state.lessons);
    const dispatch = useDispatch();

    const [innerElement, setInnerElements] = useState(null);
    const [innerHeaderHeight, setInnerHeaderHeight] = useState(0);

    const inner = useRef(null);
    const innerHeader = useRef(null);

    useEffect(() => {
        setInnerElements(inner.current);

        const height = parseInt(getComputedStyle(innerHeader.current).getPropertyValue("height"));
        const paddingY = parseInt(getComputedStyle(innerHeader.current).getPropertyValue("padding"));

        setInnerHeaderHeight(height + paddingY * 2);
    }, []);

    const blockJump = useSnapScroll({
        element: innerElement,
        additionalMovement: innerHeaderHeight * -1,
        
        onScroll: direction => {
            if(direction === "up") dispatch(lessonsActions.updateLessonBlock(-1));
            else dispatch(lessonsActions.updateLessonBlock(1));
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