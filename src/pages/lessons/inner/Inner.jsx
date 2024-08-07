import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import InnerHeader from "./InnerHeader";
import InnerDefault from "./content/InnerDefault";

const Inner = () => {
    const inner = useRef();
    const activeLesson = useSelector(state => state.lessons.activeLesson);

    useEffect(() => {
        setTimeout(() => { inner.current.style.top = "0" }, 1);
    }, []);

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