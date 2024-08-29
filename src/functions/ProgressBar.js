export const ProgressBar = {
    animation: (progressBar, type) => {
        progressBar.style.opacity = type === "appear" ? "1" : "";
    },

    update: (progressBar, movement, isHelper = false) => {
        const progressBarLine = [...progressBar.children][isHelper ? 0 : 1];

        const progressBarWidth = parseInt(getComputedStyle(progressBar).getPropertyValue("width"));
        const progressBarLineWidth = parseInt(getComputedStyle(progressBarLine).getPropertyValue("width"));
        
        const progressBarLineWidthPercentage = Math.round(calcPercentage(progressBarLineWidth, progressBarWidth));
        let newProgressBarLineWidthPercentage = progressBarLineWidthPercentage + Math.round(movement);

        if(newProgressBarLineWidthPercentage < Math.round(movement)) newProgressBarLineWidthPercentage = movement;
        else if(newProgressBarLineWidthPercentage > 100) newProgressBarLineWidthPercentage = 100;
        
        progressBarLine.style.width = `${newProgressBarLineWidthPercentage}%`;
        return newProgressBarLineWidthPercentage;
    },

    getHelperWidth: progressBar => {
        const progressBarWidth = parseInt(getComputedStyle(progressBar).getPropertyValue("width"));
        
        const progressBarLineHelper = progressBar.firstChild;
        const progressBarLineHelperWidth = parseInt(getComputedStyle(progressBarLineHelper).getPropertyValue("width"));

        return Math.round(calcPercentage(progressBarLineHelperWidth, progressBarWidth));
    }
}

function calcPercentage(number, percentOf) {
    return number / percentOf * 100;
}