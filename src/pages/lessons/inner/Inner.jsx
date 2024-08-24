import React, { useState, useRef, useEffect } from "react";
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
    const inner = useRef(null);
    const innerHeader = useRef(null);

    const activeLesson = useSelector(state => state.lessons.activeLesson);
    const dispatch = useDispatch();

    const [innerElement, setInnerElements] = useState(null);
    const [innerHeaderHeight, setInnerHeaderHeight] = useState(0);

    useEffect(() => {
        setInnerElements(inner.current);

        const height = parseInt(getComputedStyle(innerHeader.current).getPropertyValue("height"));
        const paddingY = parseInt(getComputedStyle(innerHeader.current).getPropertyValue("padding"));

        setInnerHeaderHeight(height + paddingY * 2);
    }, []);
    
    const blockJump = useSnapScroll(innerElement, innerHeaderHeight);

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
                {activeLesson.content.map((block, index) => {
                    switch(block.type) {
                        case "default": return <InnerDefault
                            block={block}
                            blockJump={() => blockJump(inner.current, "down")}
                            key={index}
                        />
                        case "multipleChoice": return <InnerMultipleChoice
                            block={block}
                            blockJump={() => blockJump(inner.current, "down")}
                            key={index}
                        />
                        case "translate": return <InnerTranslate
                            block={block}
                            blockJump={() => blockJump(inner.current, "down")}
                            key={index}
                        />
                        case "conversation": return <InnerConversation
                            block={block}
                            blockJump={() => blockJump(inner.current, "down")}
                            key={index}
                        />
                        case "end": return <InnerEnd
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