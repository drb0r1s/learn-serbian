function buttonTimer(button, delay, endOfInterval) {
    const originalContent = button.innerText;
    button.innerText = `${originalContent} (${delay})`;

    let currentDelay = delay;

    let interval = setInterval(() => {
        if(currentDelay === 1) {
            endOfInterval();

            button.innerText = originalContent;
            return clearInterval(interval);
        }
        
        currentDelay--;
        button.innerText = `${originalContent} (${currentDelay})`;
    }, 1000);
}

export default buttonTimer;