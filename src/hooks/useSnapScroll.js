import { useEffect, useRef } from "react";

const useSnapScroll = ({ element, additionalMovement, onScroll, blocked }) => {
    const onScrollFunction = useRef(null);
    const blockedType = useRef(blocked ? blocked : false);
    const scrollPoint = useRef(0);
    const touchStartY = useRef(0);
    const scrollHappened = useRef(false);
    
    useEffect(() => {
        if(!element) return;
        
        element.addEventListener("wheel", wheelScrolling, { passive: false });
        element.addEventListener("touchstart", touchStartScrolling, { passive: false });
        element.addEventListener("touchmove", touchMoveScrolling, { passive: false });
        window.addEventListener("keydown", keydownScrolling, { passive: false });

        return () => {
            element.removeEventListener("wheel", wheelScrolling, { passive: false });
            element.removeEventListener("touchstart", touchStartScrolling, { passive: false });
            element.removeEventListener("touchmove", touchMoveScrolling, { passive: false });
            window.removeEventListener("keydown", keydownScrolling, { passive: false });
        }
    }, [element]);

    useEffect(() => { if(onScroll) onScrollFunction.current = onScroll }, [onScroll]);

    function wheelScrolling(e) {
        e.preventDefault();
        if(!isScrollingAllowed(e.deltaY > 0 ? "down" : "up")) return;

        const scrollValue = snapScroll(e.deltaY > 0);
        updateScrollPoint(scrollValue);

        onScrollListener(e.deltaY > 0 ? "down" : "up");
    }

    function touchStartScrolling(e) {
        e.preventDefault();
        touchStartY.current = e.touches[0].clientY;
    }
    
    function touchMoveScrolling(e) {
        e.preventDefault();
        if(!isScrollingAllowed(touchMoveY < touchStartY.current ? "down" : "up")) return;
        
        const touchMoveY = e.touches[0].clientY;

        const scrollValue = snapScroll(touchMoveY < touchStartY.current);

        touchStartY.current = touchMoveY;
        updateScrollPoint(scrollValue);

        onScrollListener(touchMoveY < touchStartY.current ? "down" : "up");
    }

    function keydownScrolling(e) {
        if(e.code !== "ArrowUp" && e.code !== "ArrowDown") return;
        
        e.preventDefault();
        if(!isScrollingAllowed(e.code === "ArrowDown" ? "down" : "up")) return;

        const scrollValue = snapScroll(e.code === "ArrowDown");
        updateScrollPoint(scrollValue);

        onScrollListener(e.code === "ArrowDown" ? "down" : "up");
    }

    function isScrollingAllowed(direction) {
        if(blockedType.current === direction || blockedType.current === "both") return false;
        
        let status = false;
        let elementScrollTop = element.scrollTop;

        if(
            (elementScrollTop % parseInt(elementScrollTop) > 0) &&
            (Math.abs(scrollPoint.current - elementScrollTop) <= 1)
        ) elementScrollTop = scrollPoint.current;

        if(scrollPoint.current === elementScrollTop) status = true;

        return status;
    }
    
    function snapScroll(direction, externalElement = null) {
        const scrollingElement = externalElement ? externalElement : element;
        
        const scrollValue = window.innerHeight + (additionalMovement ? additionalMovement : 0);
        const directionScrollValue = direction ? scrollValue : scrollValue * -1;
        
        scrollingElement.scrollBy({ top: directionScrollValue, behavior: "smooth" });
        
        return directionScrollValue;
    }
    
    function updateScrollPoint(scrollValue) {
        scrollHappened.current = true;
        
        let newScrollPoint = element.scrollTop + scrollValue;

        if(newScrollPoint < 0) {
            scrollHappened.current = false;
            newScrollPoint = 0;
        }

        const maxScrollTop = element.scrollHeight - window.innerHeight;

        if(newScrollPoint > maxScrollTop) {
            scrollHappened.current = false;
            newScrollPoint = maxScrollTop;
        }

        scrollPoint.current = newScrollPoint;
    }

    function onScrollListener(direction) {
        if(
            onScrollFunction.current !== null &&
            scrollHappened.current
        ) onScrollFunction.current(direction);
    }

    function externalSnapScroll(element, direction) {
        const scrollValue = snapScroll(direction === "down", element);
        updateScrollPoint(scrollValue);
    }

    function blockSnapScroll(value) {
        if(blockedType.current === value) return;
        blockedType.current = value;
    }

    return { externalSnapScroll, blockSnapScroll };
}

export default useSnapScroll;