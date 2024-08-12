import { useEffect } from "react";

const useScrollBlock = (element, direction, dependency = []) => {
    useEffect(() => {
        if(!element) return;
        
        element.addEventListener("wheel", blockScrolling, { passive: false });
        element.addEventListener("touchmove", blockScrolling, { passive: false });
        element.addEventListener("keydown", blockScrolling, { passive: false });

        return () => {
            element.removeEventListener("wheel", blockScrolling, { passive: false });
            element.removeEventListener("touchmove", blockScrolling, { passive: false });
            element.removeEventListener("keydown", blockScrolling, { passive: false });
        }
    }, [element, ...dependency]);

    function blockScrolling(e) {
        switch(direction) {
            case "both":
                e.preventDefault();
                break;
            case "up":
                if(e.deltaY < 0) e.preventDefault();
                break;
            case "down":
                if(e.deltaY > 0) e.preventDefault();
                break;
            default:
        }
    }
}

export default useScrollBlock;