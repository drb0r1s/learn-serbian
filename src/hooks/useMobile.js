import { useState, useEffect } from "react";

const useMobile = (width = 769) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < width);
    
    useEffect(() => {
        const checkIsMobile = () => { setIsMobile(window.innerWidth < width) }
        window.addEventListener("resize", checkIsMobile);
    }, []);

    return { isMobile };
}

export default useMobile;