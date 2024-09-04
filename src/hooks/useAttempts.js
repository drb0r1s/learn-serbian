import { useState, useEffect } from "react";

const useAttempts = block => {
    const [attempts, setAttempts] = useState(0);
    const [noAttempts, setNoAttempts] = useState(false);
    
    const allowedAttempts = block.attempts ? block.attempts - 1 : 4;
    const newAttempt = () => setAttempts(prevAttempts => prevAttempts + 1);

    useEffect(() => { if(attempts === allowedAttempts) setNoAttempts(true) }, [attempts]);

    return { noAttempts, newAttempt };
}

export default useAttempts;