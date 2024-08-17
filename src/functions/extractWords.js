function extractWords(string) {
    const regex = /[a-zA-Z0-9]+/gm;
    const matches = [...string.matchAll(regex)];

    const words = [];
    matches.forEach(match => { words.push(match[0]) });

    return words;
}

export default extractWords;