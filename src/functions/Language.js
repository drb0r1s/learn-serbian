export const Language = {
    set: defaultLanguage => {
        const language = Language.get();
        //if(language === null) localStorage.setItem("language", defaultLanguage);
        localStorage.setItem("language", defaultLanguage);
    },

    get: () => localStorage.getItem("language"),

    inject: content => {
        if(typeof content === "string") return content;
        
        const language = Language.get();
        let languageContent = {};

        Object.keys(content).forEach((key, index) => {
            if(language === key) languageContent = Object.values(content)[index];
        });

        return languageContent;
    }
};