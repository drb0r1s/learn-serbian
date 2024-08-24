import { useEffect, useRef } from "react";

const useSnapScroll = (element, innerHeightDifference = 0, dependency = []) => {
    const scrollPoint = useRef(0);
    const touchStartY = useRef(0);
    
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
    }, [element, ...dependency]);

    function wheelScrolling(e) {
        e.preventDefault();
        if(!isScrollingAllowed()) return;
        console.log("b")

        const scrollValue = snapScroll(e.deltaY > 0);
        updateScrollPoint(scrollValue);
    }

    function touchStartScrolling(e) {
        e.preventDefault();
        touchStartY.current = e.touches[0].clientY;
    }
    
    function touchMoveScrolling(e) {
        e.preventDefault();
        if(!isScrollingAllowed()) return;
        
        const touchMoveY = e.touches[0].clientY;

        const scrollValue = snapScroll(touchMoveY < touchStartY.current);

        touchStartY.current = touchMoveY;
        updateScrollPoint(scrollValue);
    }

    function keydownScrolling(e) {
        if(e.code !== "ArrowUp" && e.code !== "ArrowDown") return;
        
        e.preventDefault();
        if(!isScrollingAllowed()) return;

        const scrollValue = snapScroll(e.code === "ArrowDown");
        updateScrollPoint(scrollValue);
    }

    function isScrollingAllowed() {
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
        
        const scrollValue = window.innerHeight - innerHeightDifference;
        const directionScrollValue = direction ? scrollValue : scrollValue * -1;
        
        scrollingElement.scrollBy({ top: directionScrollValue, behavior: "smooth" });

        return directionScrollValue;
    }
    
    function updateScrollPoint(scrollValue) {
        let newScrollPoint = element.scrollTop + scrollValue;

        if(newScrollPoint < 0) newScrollPoint = 0;

        const maxScrollTop = element.scrollHeight - window.innerHeight;
        if(newScrollPoint > maxScrollTop) newScrollPoint = maxScrollTop;

        scrollPoint.current = newScrollPoint;
    }

    function externalScroll(element, direction) {
        const scrollValue = snapScroll(direction === "down", element);
        updateScrollPoint(scrollValue);
    }

    return externalScroll;
}

export default useSnapScroll;