import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import InnerHeader from "./InnerHeader";
import InnerDefault from "./content/InnerDefault";
import InnerMultipleChoice from "./content/InnerMultipleChoice";
import useSnapScroll from "../../../hooks/useSnapScroll";

const Inner = () => {
    const inner = useRef();
    const activeLesson = useSelector(state => state.lessons.activeLesson);

    const [innerElement, setInnerElement] = useState(null);
    useEffect(() => { setInnerElement(inner.current) }, []);
    
    useSnapScroll(innerElement);

    function blockJump() {
        inner.current.scrollBy({
            top: window.innerHeight,
            behavior: "smooth"
        });
    }

    return(
        <div className="lessons-inner" ref={inner}>
            <InnerHeader inner={inner} />

            <div className="lessons-inner-lesson">
                {activeLesson.content.map((block, index) => {
                    switch(block.type) {
                        case "default": return <InnerDefault
                            block={block}
                            blockJump={blockJump}
                            key={index}
                        />
                        case "multipleChoice": return <InnerMultipleChoice
                            block={block}
                            blockJump={blockJump}
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