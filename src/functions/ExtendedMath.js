export const ExtendedMath = {
    percentageOf: (part, number) => {
        return part / number * 100;
    },

    upperRound: number => {
        if(number === Math.floor(number)) return number;
        return Math.floor(number) + 1
    },

    random: (min, max) => {
        return (Math.floor(Math.random() * (max - min + 1)) + min);
    }
}