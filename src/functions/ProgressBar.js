import { ExtendedMath } from "./ExtendedMath";

export const ProgressBar = {
    width: { main: 0, helper: 0 },
    interval: false,

    update: (progressBar, movement, isHelper = false) => {
        const progressBarLine = [...progressBar.children][isHelper ? 0 : 1];

        const progressBarWidth = parseInt(getComputedStyle(progressBar).getPropertyValue("width"));
        let progressBarLineWidth = isHelper ? ProgressBar.width.helper : ProgressBar.width.main;
        
        if(!progressBarLineWidth) {
            progressBarLineWidth = getWidth(progressBarLine);

            const progressBarLineWidthPercentage = ExtendedMath.upperRound(ExtendedMath.percentageOf(progressBarLineWidth, progressBarWidth));
            progressBarLineWidth = progressBarLineWidthPercentage;
        }
        
        let newProgressBarLineWidthPercentage = progressBarLineWidth + ExtendedMath.upperRound(movement);

        if(newProgressBarLineWidthPercentage < Math.abs(ExtendedMath.upperRound(movement))) newProgressBarLineWidthPercentage = Math.abs(ExtendedMath.upperRound(movement));
        else if(newProgressBarLineWidthPercentage > 100) newProgressBarLineWidthPercentage = 100;

        if(isHelper) ProgressBar.width.helper = newProgressBarLineWidthPercentage;
        else ProgressBar.width.main = newProgressBarLineWidthPercentage;

        if(!ProgressBar.interval) widthInterval(progressBar);
        
        progressBarLine.style.width = `${newProgressBarLineWidthPercentage}%`;
        return newProgressBarLineWidthPercentage;
    }
}

function getWidth(element) {
    return parseInt(getComputedStyle(element).getPropertyValue("width"));
}

function widthInterval(progressBar) {    
    ProgressBar.interval = true;
    
    setInterval(() => {
        const progressBarWidth = getWidth(progressBar);
        const progressBarLineWidth = getWidth([...progressBar.children][1]);
    
        const progressBarLineWidthPercentage = ExtendedMath.upperRound(ExtendedMath.percentageOf(progressBarLineWidth, progressBarWidth));
        
        if(progressBarLineWidthPercentage === ProgressBar.width.main) progressBar.style.height = "3px";
        else progressBar.style.height = "";
    }, 100);
}