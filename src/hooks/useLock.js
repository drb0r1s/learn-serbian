import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const useLock = ({ lockSnapScroll, blockId, locked, blockButton }) => {
    const [isLocked, setIsLocked] = useState(locked ? locked : false);
    const lessonBlock = useSelector(state => state.lessons.lessonBlock);

    useEffect(() => {
        if(lessonBlock !== blockId) return;

        lockSnapScroll(isLocked);
        updateBlockButton();
    }, [isLocked, lessonBlock]);

    function lock(value) {
        if(isLocked !== value) setIsLocked(value);
    }

    function updateBlockButton() {
        if(!blockButton) return;

        if(
            (isLocked === "both" || isLocked === "down") &&
            !blockButton.classList.contains("button-locked")
        ) {
            blockButton.classList.add("button-locked");
            blockButton.disabled = true;
        }

        else if(
            (isLocked === "up" || !isLocked) &&
            blockButton.classList.contains("button-locked")
        ) {
            blockButton.classList.remove("button-locked");
            blockButton.disabled = false;
        }
    }

    return { lock };
}

export default useLock;