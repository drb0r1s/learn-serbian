import extractWords from "./extractWords";
import { ExtendedArray } from "./ExtendedArray";
import { Language } from "./Language";
import { Case } from "./Case";

function checkAnswer(block, userAnswer, answers) {
    let isCorrect = false;
    
    switch(block.type) {
        case "multipleChoice":
            if(userAnswer === block.answer) isCorrect = true;
            break;

        case "translate":
            isCorrect = checkInputAnswer(true);        
            break;

        case "conversation":
            isCorrect = checkInputAnswer(false, answers);
            break;

        case "connect":
            const userAnswerObject = { key: Case.toSnake(userAnswer[0]), value: userAnswer[1] };
            
            Object.keys(answers).forEach((key, index) => {
                const value = Object.values(answers)[index];
                
                if(
                    userAnswerObject.key === key &&
                    userAnswerObject.value === value
                ) isCorrect = true;
            });
            
            break;
        default:
    }

    function checkInputAnswer(languageSupport = false, answers = []) {
        let status = false;

        const userAnswerWords = extractWords(userAnswer);
        
        const validAnswers = answers.length ? answers : block.answers;
        const languageAnswers = languageSupport ? Language.inject(validAnswers) : validAnswers;

        languageAnswers.forEach(answer => {
            const answerWords = extractWords(answer);
            if(ExtendedArray.compareTwo(userAnswerWords, answerWords)) status = true;
        });

        return status;
    }

    return { isCorrect };
}

export default checkAnswer;