import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import InnerHeader from "./InnerHeader";
import InnerDefault from "./content/InnerDefault";
import InnerMultipleChoice from "./content/InnerMultipleChoice";
import InnerTranslate from "./content/InnerTranslate";
import useSnapScroll from "../../../hooks/useSnapScroll";

const Inner = () => {
    const inner = useRef(null);
    const innerHeader = useRef(null);

    const activeLesson = useSelector(state => state.lessons.activeLesson);

    const [innerElement, setInnerElements] = useState(null);
    const [innerHeaderHeight, setInnerHeaderHeight] = useState(0);

    useEffect(() => {
        setInnerElements(inner.current);

        const height = parseInt(getComputedStyle(innerHeader.current).getPropertyValue("height"));
        setInnerHeaderHeight(height);
    }, []);
    
    const blockJump = useSnapScroll(innerElement, innerHeaderHeight);

    return(
        <div className="lessons-inner" ref={inner}>
            <InnerHeader inner={inner} innerHeader={innerHeader}  />

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
                        default:
                    }
                })}
            </div>
        </div>
    );
}

export default Inner;