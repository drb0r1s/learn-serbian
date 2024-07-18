import { useState, useEffect } from "react";

const useMobile = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    
    useEffect(() => {
        const checkIsMobile = () => { setIsMobile(window.innerWidth <= 768) }
        window.addEventListener("resize", checkIsMobile);
    }, []);

    return { isMobile };
}

export default useMobile;