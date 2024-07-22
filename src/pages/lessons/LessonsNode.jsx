import React from "react";

const LessonsNode = ({ type }) => {
    return(
        <>
            {type === "active" ? <div className="lessons-tree-node lessons-tree-node-active">
                <div className="lessons-tree-node-block lessons-tree-node-block-1">
                    <div className="lessons-tree-node-line-holder">
                        <div className="lessons-tree-node-line"></div>
                    </div>
                </div>
                <div className="lessons-tree-node-block lessons-tree-node-block-2"></div>
                <div className="lessons-tree-node-block lessons-tree-node-block-3"></div>
                <div className="lessons-tree-node-block lessons-tree-node-block-4"></div>
                <strong>Lessons title</strong>
            </div> : <div className="lessons-tree-node lessons-tree-node-default">
                <div className="lessons-tree-node-block lessons-tree-node-block-1"></div>
                <div className="lessons-tree-node-block lessons-tree-node-block-2"></div>
                <div className="lessons-tree-node-block lessons-tree-node-block-3"></div>
                <strong>Lesson</strong>
            </div>}
        </>
    );
}

export default LessonsNode;