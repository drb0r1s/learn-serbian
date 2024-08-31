export const Case = {
    toSnake: string => {
        let snakeCase = "";
        const splittedString = string.toLowerCase().split(" ");
        
        for(let i = 0; i < splittedString.length; i++) {
            if(!i) snakeCase += splittedString[i];
            
            else {
                const snakeCaseWord = splittedString[i][0].toUpperCase() + splittedString[i].substring(1);
                snakeCase += snakeCaseWord;
            } 
        }

        return snakeCase;
    },

    toKebab: string => {
        const kebabCase = string.toLowerCase().replaceAll(" ", "-");
        return kebabCase;
    }
}