export const ProgressBar = {
    width: { main: 0, helper: 0 },
    
    animation: (progressBar, type) => {
        progressBar.style.opacity = type === "appear" ? "1" : "";
    },

    update: (progressBar, movement, isHelper = false) => {
        const progressBarLine = [...progressBar.children][isHelper ? 0 : 1];

        const progressBarWidth = parseInt(getComputedStyle(progressBar).getPropertyValue("width"));
        let progressBarLineWidth = isHelper ? ProgressBar.width.helper : ProgressBar.width.main;
        
        if(!progressBarLineWidth) {
            progressBarLineWidth = getWidth(progressBarLine);

            const progressBarLineWidthPercentage = Math.round(calcPercentage(progressBarLineWidth, progressBarWidth));
            progressBarLineWidth = progressBarLineWidthPercentage;
        }
        
        let newProgressBarLineWidthPercentage = progressBarLineWidth + Math.round(movement);

        console.log(newProgressBarLineWidthPercentage, Math.abs(Math.round(movement)))

        if(newProgressBarLineWidthPercentage < Math.abs(Math.round(movement))) newProgressBarLineWidthPercentage = Math.abs(Math.round(movement));
        else if(newProgressBarLineWidthPercentage > 100) newProgressBarLineWidthPercentage = 100;

        if(isHelper) ProgressBar.width.helper = newProgressBarLineWidthPercentage;
        else ProgressBar.width.main = newProgressBarLineWidthPercentage;

        progressBarLine.style.width = `${newProgressBarLineWidthPercentage}%`;
        return newProgressBarLineWidthPercentage;
    }
}

function calcPercentage(number, percentOf) {
    return number / percentOf * 100;
}

function getWidth(element) {
    return parseInt(getComputedStyle(element).getPropertyValue("width"));
}