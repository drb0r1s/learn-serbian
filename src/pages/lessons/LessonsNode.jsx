import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { lessonsActions } from "../../state/reducers/lessonsSlice";
import useExternalData from "../../hooks/useExternalData";

const LessonsNode = ({ lesson }) => {
    const activeLesson = useSelector(state => state.lessons.activeLesson);
    const dispatch = useDispatch();

    const lessons = useExternalData("lessons");
    const type = activeLesson.id === lesson.id ? "active" : "default";
    const position = getNodePosition();

    function getNodePosition() {
        if(Object.keys(lessons).length === 1) return "only";

        if(!lesson.id) return "first";
        else if(lesson.id === Object.keys(lessons).length - 1) return "last";

        return "middle";
    }
    
    function changeActiveLesson(newLesson) {
        if(activeLesson.id === newLesson.id) return;
        dispatch(lessonsActions.updateActiveLesson(newLesson));
    }
    
    return(
        <div className={`lessons-tree-node lessons-tree-node-${type}`} onClick={() => changeActiveLesson(lesson)}>
            {type === "active" ? <>
                <div className="lessons-tree-node-block lessons-tree-node-block-1">
                    <div className="lessons-tree-node-line-holder">
                        {(position === "last" || position === "middle") ? <div className="lessons-tree-node-line-top"></div> : <></>}
                        {(position === "first" || position === "middle") ? <div className="lessons-tree-node-line-bottom"></div> : <></>}
                    </div>
                </div>
                <div className="lessons-tree-node-block lessons-tree-node-block-2"></div>
                <div className="lessons-tree-node-block lessons-tree-node-block-3"></div>
                <div className="lessons-tree-node-block lessons-tree-node-block-4"></div>
                <strong>{lesson.name}</strong>
            </> : <>
                <div className="lessons-tree-node-block lessons-tree-node-block-1"></div>
                <div className="lessons-tree-node-block lessons-tree-node-block-2"></div>
                <div className="lessons-tree-node-block lessons-tree-node-block-3"></div>
                <strong>{lesson.name}</strong>
            </>}
        </div>
    );
}

export default LessonsNode;