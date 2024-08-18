export const Language = {
    set: defaultLanguage => {
        const language = localStorage.getItem("language");
        //if(language === null) localStorage.setItem("language", defaultLanguage);
        localStorage.setItem("language", defaultLanguage);
    },

    get: () => localStorage.getItem("language"),

    inject: content => {
        
        const language = Language.get();
        let languageContent = {};

        Object.keys(content).forEach((key, index) => {
            if(language === key) languageContent = Object.values(content)[index];
        });

        return languageContent;
    }
};