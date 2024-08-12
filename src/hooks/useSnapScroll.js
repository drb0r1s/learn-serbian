import { useEffect } from "react";

const useSnapScroll = (element, dependency = []) => {
    useEffect(() => {
        if(!element) return;
        
        element.addEventListener("wheel", snapScroll, { passive: false });
        element.addEventListener("touchmove", snapScroll, { passive: false });
        element.addEventListener("keydown", snapScroll, { passive: false });

        return () => {
            element.removeEventListener("wheel", snapScroll, { passive: false });
            element.removeEventListener("touchmove", snapScroll, { passive: false });
            element.removeEventListener("keydown", snapScroll, { passive: false });
        }
    }, [element, ...dependency]);

    function snapScroll(e) {
        e.preventDefault();
        
        const top = e.deltaY > 0 ? window.innerHeight : window.innerHeight * -1;
        element.scrollBy({ top, behavior: "smooth" });
    }
}

export default useSnapScroll;