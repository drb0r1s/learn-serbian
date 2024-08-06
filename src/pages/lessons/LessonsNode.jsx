import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateActiveLesson } from "../../state/reducers/lessonsSlice";

const LessonsNode = ({ lesson }) => {
    const activeLesson = useSelector(state => state.lessons.activeLesson);
    const dispatch = useDispatch();
    
    const type = activeLesson.id === lesson.id ? "active" : "default";
    
    function changeActiveLesson(newLesson) {
        dispatch(updateActiveLesson(newLesson));
    }
    
    return(
        <div className={`lessons-tree-node lessons-tree-node-${type}`} onClick={() => changeActiveLesson(lesson)}>
            {type === "active" ? <>
                <div className="lessons-tree-node-block lessons-tree-node-block-1">
                    <div className="lessons-tree-node-line-holder">
                        <div className="lessons-tree-node-line"></div>
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