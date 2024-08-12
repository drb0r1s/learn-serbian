import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import InnerHeader from "./InnerHeader";
import InnerDefault from "./content/InnerDefault";
import useScrollBlock from "../../../hooks/useScrollBlock";

const Inner = () => {
    const inner = useRef();
    const activeLesson = useSelector(state => state.lessons.activeLesson);

    const [innerElement, setInnerElement] = useState(null);
    useEffect(() => { setInnerElement(inner.current) }, []);
    
    useScrollBlock(innerElement, "down");

    return(
        <div className="lessons-inner" ref={inner}>
            <InnerHeader inner={inner} />

            <div className="lessons-inner-lesson">
                {activeLesson.content.map((block, index) => {
                    return <InnerDefault block={block} key={index} />
                })}
            </div>
        </div>
    );
}

export default Inner;