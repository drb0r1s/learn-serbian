export const ProgressBar = {
    animation: (progressBar, type) => {
        progressBar.style.opacity = type === "appear" ? "1" : "";
        progressBar.style.left = type === "appear" ? "0" : "";
    },

    update: (progressBar, movement) => {
        const progressBarLine = [...progressBar.children][1];

        const progressBarHeight = parseInt(getComputedStyle(progressBar).getPropertyValue("height"));
        const progressBarLineHeight = parseInt(getComputedStyle(progressBarLine).getPropertyValue("height"));
        
        const progressBarLineHeightPercentage = Math.round(calcPercentage(progressBarLineHeight, progressBarHeight));
        let newProgressBarLineHeightPercentage = progressBarLineHeightPercentage + Math.round(movement);

        if(newProgressBarLineHeightPercentage < Math.round(movement)) newProgressBarLineHeightPercentage = movement;
        else if(newProgressBarLineHeightPercentage > 100) newProgressBarLineHeightPercentage = 100;
        
        progressBarLine.style.height = `${newProgressBarLineHeightPercentage}%`;
    }
}

function calcPercentage(number, percentOf) {
    return number / percentOf * 100;
}