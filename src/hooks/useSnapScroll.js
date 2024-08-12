import { useEffect, useRef } from "react";

const useSnapScroll = (element, dependency = []) => {
    const touchStartY = useRef(0);
    
    useEffect(() => {
        if(!element) return;
        
        element.addEventListener("wheel", wheelScrolling, { passive: false });
        element.addEventListener("touchstart", touchStartScrolling, { passive: false });
        element.addEventListener("touchmove", touchMoveScrolling, { passive: false });
        element.addEventListener("keydown", keydownScrolling, { passive: false });

        return () => {
            element.removeEventListener("wheel", wheelScrolling, { passive: false });
            element.removeEventListener("touchstart", touchStartScrolling, { passive: false });
            element.removeEventListener("touchmove", touchMoveScrolling, { passive: false });
            element.removeEventListener("keydown", keydownScrolling, { passive: false });
        }
    }, [element, ...dependency]);

    function wheelScrolling(e) {
        e.preventDefault();
        
        const top = e.deltaY > 0 ? window.innerHeight : window.innerHeight * -1;
        element.scrollBy({ top, behavior: "smooth" });
    }

    function touchStartScrolling(e) {
        e.preventDefault();
        touchStartY.current = e.touches[0].clientY;
    }
    
    function touchMoveScrolling(e) {
        e.preventDefault();
        
        const touchMoveY = e.touches[0].clientY;

        const top = touchMoveY < touchStartY.current ? window.innerHeight : window.innerHeight * -1;
        element.scrollBy({ top, behavior: "smooth" });

        touchStartY.current = touchMoveY;
    }

    function keydownScrolling(e) {
        e.preventDefault();
        console.log(e)
    }
}

export default useSnapScroll;